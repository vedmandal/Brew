import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Movie from '@/models/Movie';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');


  if (!id || !id.startsWith('tt')) {
    return NextResponse.json({ error: "Valid IMDb ID (starting with 'tt') is required" }, { status: 400 });
  }

  try {
    await connectDB();


    const omdbApiKey = process.env.OMDB_API_KEY;
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${omdbApiKey}`);
    
    if (omdbResponse.data.Response === "False") {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const title = omdbResponse.data.Title;
    const poster = omdbResponse.data.Poster;
    const year = omdbResponse.data.Year;

    const { data: html } = await axios.get(`https://www.imdb.com/title/${id}/reviews`, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
      }
    });
    
    const $ = cheerio.load(html);
    const reviews: string[] = [];
    $('.text.show-more__control').each((i, el) => { 
      if(i < 3) reviews.push($(el).text().trim()); 
    });


    const apiKey = process.env.GEMINI_API_KEY;
    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    let aiSummaryText = "";

    try {
      const geminiResponse = await axios.post(
        geminiUrl,
        {
          contents: [{
            role: "user",
            parts: [{ text: `You are a professional movie critic. Based on these audience reviews for the movie "${title}", provide a concise 2-sentence summary of the general sentiment: ${reviews.join(" ")}` }]
          }]
        },
        { headers: { "Content-Type": "application/json" } }
      );

      aiSummaryText = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";
    } catch (aiErr: any) {
      console.error("GEMINI ERROR:", aiErr.response?.data || aiErr.message);
      aiSummaryText = "Sentiment analysis currently unavailable. See raw reviews below.";
    }


    await Movie.findOneAndUpdate(
      { imdbId: id },
      { title, aiSummary: aiSummaryText, poster, year, imdbId: id },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      title,
      poster,
      year,
      reviews,
      aiSummary: aiSummaryText
    });

  } catch (err: any) {
    console.error("Server Error:", err.message);
    return NextResponse.json({ 
      error: "Failed to process movie insights.",
      details: err.message 
    }, { status: 500 });
  }
}