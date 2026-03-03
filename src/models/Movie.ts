import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  imdbId: { type: String, unique: true },
  title: String,
  poster: String,
  year: String,
  rating: String,
  plot: String,
  cast: String,
  aiSummary: String,
  sentiment: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);