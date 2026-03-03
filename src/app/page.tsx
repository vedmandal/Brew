"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [imdbId, setImdbId] = useState('');
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false); 

  useEffect(() => {
    fetchHistory();
  }, [movieData]);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("History fetch failed");
    }
  };

  const fetchMovie = async (idToSearch?: string) => {
    const targetId = idToSearch || imdbId;
    if (!targetId || !targetId.startsWith('tt')) {
      alert("Please enter a valid ID (e.g., tt0133093)");
      return;
    }
    setLoading(true);
    setShowHistory(false); 
    try {
      const res = await fetch(`/api/movie?id=${targetId}`);
      const data = await res.json();
      setMovieData(data);
    } catch (err) {
      alert("Error fetching movie data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 sm:p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-8 lg:gap-12">
        

        <aside className={`${showHistory ? 'block' : 'hidden'} lg:block lg:col-span-1 space-y-6`}>
          <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-sm sticky top-12">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-4">Database History</h3>
            <div className="space-y-3">
              {history.length === 0 && <p className="text-xs text-slate-600">No recent searches</p>}
              {history.slice(0, 5).map((item, i) => (
                <button 
                  key={i}
                  onClick={() => fetchMovie(item.imdbId)}
                  className="w-full text-left p-3 rounded-xl bg-slate-800/30 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/30 transition-all group"
                >
                  <p className="text-sm font-medium truncate group-hover:text-indigo-300">{item.title}</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase mt-1">{item.imdbId}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

    
        <section className="lg:col-span-3 space-y-6 md:space-y-8">
          <header className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter bg-gradient-to-br from-white via-indigo-300 to-slate-500 bg-clip-text text-transparent">
                BREW AI.
              </h1>
              <p className="text-slate-400 font-medium mt-2 text-sm sm:text-base">Deep audience insights from IMDb reviews.</p>
            </div>
           
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="lg:hidden text-xs font-bold px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/50"
            >
              {showHistory ? "Close History" : "View History"}
            </button>
          </header>

        
          <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900/80 p-2 rounded-2xl border border-slate-800 focus-within:border-indigo-500/50 shadow-2xl transition-all gap-2">
            <input 
              value={imdbId}
              onChange={(e) => setImdbId(e.target.value)}
              placeholder="Paste IMDb ID (tt...)" 
              className="flex-1 bg-transparent px-4 py-3 outline-none text-indigo-200 placeholder:text-slate-700 font-mono text-sm sm:text-base"
            />
            <button 
              onClick={() => fetchMovie()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 sm:px-10 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50 text-sm"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Build Insight"}
            </button>
          </div>

          {movieData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative group mx-auto w-full max-w-[280px] md:max-w-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-[2/3]">
                  <img src={movieData.poster} alt="Poster" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-center md:text-left">{movieData.title}</h2>
                  <div className="flex justify-center md:justify-start gap-3 mt-4">
                    <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-mono text-slate-400">{movieData.year}</span>
                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-mono text-indigo-400 tracking-tighter uppercase">AI Perspective</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600/20 to-transparent p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative">
                  <div className="absolute top-2 right-4 opacity-10 text-indigo-400 font-serif text-5xl italic">"</div>
                  <h3 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-4">Gemini Intelligence</h3>
                  <p className="text-lg sm:text-xl leading-relaxed font-medium text-slate-200">{movieData.aiSummary}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Raw Audience Data</h3>
                  <div className="grid gap-3">
                    {movieData.reviews?.map((r: string, i: number) => (
                      <div key={i} className="p-4 sm:p-5 bg-slate-900/40 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-400 italic border-l-4 border-l-slate-700 hover:border-l-indigo-500 transition-all">
                        {r.substring(0, 180)}...
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}