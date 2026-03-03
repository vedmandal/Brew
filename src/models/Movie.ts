import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  imdbId: String,
  title: String,
  aiSummary: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);