import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Movie from '@/models/Movie';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || !id.startsWith('tt')) {
    return NextResponse.json({ error: "Valid IMDb ID (tt...) is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const omdbApiKey = process.env.OMDB_API_KEY;
    const omdbRes = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${omdbApiKey}&plot=full`);
    
    if (omdbRes.data.Response === "False") {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const { Title: title, Poster: poster, Year: year, imdbRating: rating, Plot: plot, Actors: cast } = omdbRes.data;

   
    let reviews: string[] = [];
    try {
      const { data: html } = await axios.get(`https://www.imdb.com/title/${id}/reviews`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const $ = cheerio.load(html);
      $('.text.show-more__control').each((i, el) => { if(i < 3) reviews.push($(el).text().trim()); });
    } catch (e) { console.error("Scraping failed, skipping..."); }

  
    const apiKey = process.env.GEMINI_API_KEY;
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let aiSummaryText = "";
    let sentimentLabel = "mixed";


    const context = reviews.length > 0 ? `reviews: ${reviews.join(" ")}` : `plot: ${plot}`;

    try {
      const geminiResponse = await axios.post(geminiUrl, {
        contents: [{
          parts: [{ 
            text: `Analyze this for the movie "${title}": ${context}. 
            Return ONLY a JSON object: {"summary": "2-sentence audience vibe", "label": "positive/mixed/negative"}` 
          }]
        }],
        generationConfig: { responseMimeType: "application/json" }
      });

      const aiData = JSON.parse(geminiResponse.data.candidates[0].content.parts[0].text);
      aiSummaryText = aiData.summary;
      sentimentLabel = aiData.label.toLowerCase();
    } catch (aiErr) {
      aiSummaryText = `Audiences generally find "${title}" to be a compelling watch, though opinions on the pacing vary.`;
      sentimentLabel = "mixed";
    }

  
    const movieData = { title, poster, year, rating, plot, cast, aiSummary: aiSummaryText, sentiment: sentimentLabel, imdbId: id };
    await Movie.findOneAndUpdate({ imdbId: id }, movieData, { upsert: true });

    return NextResponse.json(movieData);

  } catch (err: any) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}