import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Movie from '@/models/Movie';

export async function GET() {
  try {
    await connectDB();
    
    
    const history = await Movie.find({})
      .sort({ createdAt: -1 }) 
      .limit(5);

    return NextResponse.json(history);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}