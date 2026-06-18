import { Medal, Timer, Wind } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TrackEvents() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}/athletes/`)
      .then(res => res.json())
      .then(data => {
        // Find sprint/running athletes
        const sprinters = data.filter((a: any) => 
          a.event.toUpperCase().includes("SPRINT") || 
          a.event.toUpperCase().includes("RUN") || 
          a.event.toUpperCase().includes("100M")
        );
        setAthletes(sprinters.length > 0 ? sprinters : data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const results = athletes.map((a, i) => {
    const isPB = i === 0;
    // Extract numerical time from PB e.g. "10.8s" -> 10.8
    const baseTime = parseFloat(a.pb.replace(/[^\d.]/g, '')) || 10.5;
    const timeVal = (baseTime + (i * 0.12) + (Math.random() * 0.04)).toFixed(2);
    return {
      pos: i + 1,
      lane: (i % 8) + 1,
      name: a.name,
      island: a.island,
      reaction: `0.${120 + (i * 8) + Math.floor(Math.random() * 10)}s`,
      time: `${timeVal}s`,
      pb: isPB
    };
  });

  const isDemo = sessionStorage.getItem('demoMode') === 'true';

  const mockResults = [
    { pos: 1, lane: 4, name: "MARCUS JOHNSON", reaction: "0.142s", time: "9.86s", pb: true, island: "ANDROTH" },
    { pos: 2, lane: 5, name: "ANDRE DE GRASSE", reaction: "0.135s", time: "9.89s", pb: false, island: "MINICOY" },
    { pos: 3, lane: 3, name: "CHRISTIAN COLEMAN", reaction: "0.128s", time: "9.92s", pb: false, island: "KAVARATTI" },
    { pos: 4, lane: 6, name: "FERDINAND OMANYALA", reaction: "0.151s", time: "9.95s", pb: false, island: "AGATTI" },
    { pos: 5, lane: 2, name: "AKANI SIMBINE", reaction: "0.144s", time: "9.98s", pb: false, island: "KAVARATTI" },
    { pos: 6, lane: 7, name: "ZHARNEL HUGHES", reaction: "0.139s", time: "10.02s", pb: false, island: "AMINI" },
    { pos: 7, lane: 8, name: "YOHAN BLAKE", reaction: "0.156s", time: "10.05s", pb: false, island: "KADMAT" },
    { pos: 8, lane: 1, name: "MARCEL JACOBS", reaction: "0.160s", time: "10.08s", pb: false, island: "CHETLAT" },
  ];

  const displayResults = isDemo ? mockResults : results;

  return (
    <div className="pb-10 pt-4 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl editorial-heading-bebas text-track-dark leading-none">TRACK EVENTS</h1>
          <p className="text-xl font-black text-track-dark/60 uppercase tracking-widest border-l-4 border-track-coral pl-3 mt-2">Men's 100m Final • Heat 1 • Official Results</p>
        </div>
        <div className="flex items-center gap-4 bg-white border-4 border-track-dark p-2 shadow-[4px_4px_0px_#010F1A]">
          <div className="flex items-center gap-2 px-3 border-r-4 border-track-dark">
            <Wind className="w-5 h-5 text-track-dark stroke-[3]" />
            <span className="font-black text-lg">+1.2 m/s</span>
          </div>
          <div className="flex items-center gap-2 px-3">
            <span className="w-3 h-3 bg-track-lagoon rounded-full"></span>
            <span className="font-black uppercase tracking-widest text-sm">OFFICIAL</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-3 brutal-card p-0 flex flex-col justify-end bg-track-foam min-h-[300px]">
          <div className="flex justify-center items-end gap-2 p-8 border-b-8 border-track-dark">
            {/* Silver */}
            {displayResults[1] && (
              <div className="flex flex-col items-center w-32 group cursor-pointer">
                <div className="w-12 h-12 bg-[#E2E8F0] border-4 border-track-dark rounded-full flex items-center justify-center mb-4 z-10 shadow-[4px_4px_0px_#010F1A] transform group-hover:-translate-y-2 transition-transform">
                  <Medal className="w-6 h-6 text-track-dark stroke-[2.5]" />
                </div>
                <div className="h-32 w-full bg-[#E2E8F0] border-4 border-track-dark border-b-0 flex flex-col items-center justify-end pb-4">
                  <span className="text-4xl font-black text-track-dark">2</span>
                </div>
                <div className="text-center mt-4">
                  <p className="font-black text-track-dark text-sm uppercase">{displayResults[1].name.split(' ')[0]}</p>
                  <p className="text-sm font-bold text-track-dark/60">{displayResults[1].time}</p>
                </div>
              </div>
            )}

            {/* Gold */}
            {displayResults[0] && (
              <div className="flex flex-col items-center w-40 group cursor-pointer relative -top-8">
                <div className="w-16 h-16 bg-track-sand border-4 border-track-dark rounded-full flex items-center justify-center mb-4 z-10 shadow-[4px_4px_0px_#010F1A] transform group-hover:-translate-y-2 transition-transform">
                  <Medal className="w-8 h-8 text-track-dark stroke-[2.5]" />
                </div>
                <div className="h-40 w-full bg-track-sand border-4 border-track-dark border-b-0 flex flex-col items-center justify-end pb-4">
                  <span className="text-6xl font-black text-track-dark">1</span>
                </div>
                <div className="text-center mt-4">
                  <p className="font-black text-track-dark text-base uppercase">{displayResults[0].name.split(' ')[0]}</p>
                  <p className="text-sm font-black text-track-coral">{displayResults[0].time} {displayResults[0].pb && 'PB'}</p>
                </div>
              </div>
            )}

            {/* Bronze */}
            {displayResults[2] && (
              <div className="flex flex-col items-center w-32 group cursor-pointer relative top-4">
                <div className="w-12 h-12 bg-[#CD7F32] border-4 border-track-dark rounded-full flex items-center justify-center mb-4 z-10 shadow-[4px_4px_0px_#010F1A] transform group-hover:-translate-y-2 transition-transform">
                  <Medal className="w-6 h-6 text-white stroke-[2.5]" />
                </div>
                <div className="h-24 w-full bg-[#CD7F32] border-4 border-track-dark border-b-0 flex flex-col items-center justify-end pb-4">
                  <span className="text-4xl font-black text-white">3</span>
                </div>
                <div className="text-center mt-4">
                  <p className="font-black text-track-dark text-sm uppercase">{displayResults[2].name.split(' ')[0]}</p>
                  <p className="text-sm font-bold text-track-dark/60">{displayResults[2].time}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="brutal-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-track-dark text-white text-sm uppercase tracking-widest font-black border-b-8 border-track-dark">
                <th className="p-4 border-r-4 border-track-dark/20 text-center w-16">POS</th>
                <th className="p-4 border-r-4 border-track-dark/20 text-center w-16">LANE</th>
                <th className="p-4 border-r-4 border-track-dark/20">ATHLETE</th>
                <th className="p-4 border-r-4 border-track-dark/20 text-center">ISLAND</th>
                <th className="p-4 border-r-4 border-track-dark/20 text-right">REACTION</th>
                <th className="p-4 text-right">TIME</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center font-bold text-track-dark/40 uppercase">Loading Results...</td>
                </tr>
              ) : displayResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center font-bold text-track-dark/40 uppercase">No Athletes Registered</td>
                </tr>
              ) : displayResults.map((result, i) => (
                <tr key={i} className={`border-b-4 border-track-dark/10 hover:bg-track-foam transition-colors ${i < 3 ? 'bg-white' : 'bg-track-foam/50'}`}>
                  <td className="p-4 border-r-4 border-track-dark/10 text-center font-black text-2xl text-track-dark">{result.pos}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-center">
                    <div className="w-8 h-8 mx-auto bg-track-dark text-white flex items-center justify-center font-black transform -skew-x-6">
                      {result.lane}
                    </div>
                  </td>
                  <td className="p-4 border-r-4 border-track-dark/10 font-black text-track-dark text-lg uppercase">{result.name}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-center font-black text-track-dark/60 uppercase">{result.island}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-right font-bold text-track-dark/80 flex items-center justify-end gap-2">
                    <Timer className="w-4 h-4" /> {result.reaction}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <span className="font-black text-2xl text-track-dark">{result.time}</span>
                      {result.pb && (
                        <span className="bg-track-coral text-white text-xs font-black px-2 py-1 transform -skew-x-6 shadow-[2px_2px_0px_#010F1A]">PB</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
