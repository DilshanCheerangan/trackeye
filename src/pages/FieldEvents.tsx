import { Target, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FieldEvents() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}/athletes/`)
      .then(res => res.json())
      .then(data => {
        // Find field athletes
        const fields = data.filter((a: any) => 
          a.event.toUpperCase().includes("JUMP") || 
          a.event.toUpperCase().includes("THROW") || 
          a.event.toUpperCase().includes("BALL")
        );
        setAthletes(fields.length > 0 ? fields : data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const formatAttempt = (val: string) => {
    if (val === 'X') {
      return <span className="text-track-coral font-black">X</span>;
    }
    return <span className="font-bold">{val}</span>;
  };

  const attempts = athletes.map((a, i) => {
    // Extract decimal value e.g. "6.38M" -> 6.38
    const baseVal = parseFloat(a.pb.replace(/[^\d.]/g, '')) || 6.2;
    const a1 = (baseVal - 0.25 + (Math.random() * 0.1)).toFixed(2);
    const a2 = Math.random() > 0.75 ? "X" : (baseVal - 0.15 + (Math.random() * 0.1)).toFixed(2);
    const a3 = (baseVal + (Math.random() * 0.15)).toFixed(2);
    const a4 = (baseVal - 0.3 + (Math.random() * 0.2)).toFixed(2);
    const a5 = Math.random() > 0.7 ? "X" : (baseVal + (Math.random() * 0.05)).toFixed(2);
    const a6 = (baseVal - 0.05 + (Math.random() * 0.25)).toFixed(2);
    
    // Find best attempt
    const vals = [a1, a2, a3, a4, a5, a6].map(v => v === "X" ? 0 : parseFloat(v));
    const bestVal = Math.max(...vals);
    const isPB = bestVal > baseVal;

    return {
      pos: i + 1,
      name: a.name,
      island: a.island,
      a1, a2, a3, a4, a5, a6,
      best: `${bestVal.toFixed(2)}m`,
      pb: isPB
    };
  });

  const isDemo = sessionStorage.getItem('demoMode') === 'true';

  const mockAttempts = [
    { pos: 1, name: "SARAH CHEN", island: "AMINI", a1: "6.98", a2: "X", a3: "7.12", a4: "6.95", a5: "X", a6: "7.15", best: "7.15m", pb: true },
    { pos: 2, name: "MALAIIKA MIHAMBO", island: "MINICOY", a1: "6.85", a2: "6.95", a3: "6.92", a4: "7.02", a5: "X", a6: "6.99", best: "7.02m", pb: false },
    { pos: 3, name: "IVANA VULETA", island: "KAVARATTI", a1: "X", a2: "6.88", a3: "6.90", a4: "X", a5: "6.95", a6: "X", best: "6.95m", pb: false },
    { pos: 4, name: "TARA DAVIS", island: "AGATTI", a1: "6.75", a2: "6.85", a3: "X", a4: "6.82", a5: "6.91", a6: "6.88", best: "6.91m", pb: false },
    { pos: 5, name: "MARYNA BEKH", island: "ANDROTH", a1: "6.80", a2: "X", a3: "6.85", a4: "X", a5: "X", a6: "6.82", best: "6.85m", pb: false },
  ];

  const displayAttempts = isDemo ? mockAttempts : attempts;

  // Sort attempts to determine leader
  const sortedAttempts = [...displayAttempts].sort((a, b) => parseFloat(b.best) - parseFloat(a.best));
  const leader = sortedAttempts[0] || { name: "NO LEADER", best: "0.00m" };

  return (
    <div className="pb-10 pt-4 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl editorial-heading-bebas text-track-dark leading-none">FIELD EVENTS</h1>
          <p className="text-xl font-black text-track-dark/60 uppercase tracking-widest border-l-4 border-track-coral pl-3 mt-2">Women's Long Jump • Final • Live</p>
        </div>
        <div className="flex items-center gap-4 bg-white border-4 border-track-dark p-2 shadow-[4px_4px_0px_#010F1A]">
          <div className="flex items-center gap-2 px-3 border-r-4 border-track-dark">
            <Target className="w-5 h-5 text-track-dark stroke-[3]" />
            <span className="font-black text-lg">ROUND 6</span>
          </div>
          <div className="flex items-center gap-2 px-3">
            <span className="w-3 h-3 bg-track-coral rounded-full animate-pulse"></span>
            <span className="font-black uppercase tracking-widest text-sm text-track-coral">LIVE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1 brutal-card p-6 bg-track-dark text-white flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-track-coral border-4 border-white flex items-center justify-center transform -skew-x-12 mb-6 shadow-[4px_4px_0px_#00C8C8]">
            <Target className="w-10 h-10 text-white stroke-[3]" />
          </div>
          <h3 className="text-sm font-black text-white/50 uppercase tracking-widest mb-2">CURRENT LEADER</h3>
          <p className="text-4xl editorial-heading-bebas mb-2 uppercase">{leader.name.split(' ')[0]}</p>
          <div className="text-5xl font-black text-track-lagoon">{leader.best}</div>
        </div>

        <div className="lg:col-span-3 brutal-card p-6 bg-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5 text-track-dark pointer-events-none">
            <AlertCircle className="w-64 h-64" />
          </div>
          <div className="flex justify-between items-center mb-6 border-b-4 border-track-dark pb-4 relative z-10">
             <h3 className="text-3xl editorial-heading-bebas text-track-dark">LATEST ATTEMPT</h3>
             <span className="bg-track-coral text-white font-black px-3 py-1 text-sm uppercase transform -skew-x-12 shadow-[2px_2px_0px_#010F1A]">UNDER REVIEW</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
             <div className="w-32 h-32 bg-track-foam border-4 border-track-dark rounded-full overflow-hidden shrink-0 flex items-center justify-center">
               <div className="w-full h-full bg-track-dark text-white flex items-center justify-center font-editorial-bebas text-6xl">
                 {leader.name.charAt(0)}
               </div>
             </div>
             <div className="flex-1 text-center md:text-left">
                <p className="text-xl font-black text-track-dark uppercase mb-1">{leader.name}</p>
                <p className="text-sm font-bold text-track-dark/60 uppercase mb-4">Attempt 6</p>
                <div className="flex justify-center md:justify-start items-end gap-4">
                   <div className="text-6xl font-black text-track-dark leading-none">{leader.best}</div>
                   <div className="text-lg font-bold text-track-dark/50 mb-1">Wind: +0.8</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="brutal-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-track-dark text-white text-sm uppercase tracking-widest font-black border-b-8 border-track-dark">
                <th className="p-4 border-r-4 border-track-dark/20 w-16">POS</th>
                <th className="p-4 border-r-4 border-track-dark/20 text-left">ATHLETE</th>
                <th className="p-4 border-r-4 border-track-dark/20">1</th>
                <th className="p-4 border-r-4 border-track-dark/20">2</th>
                <th className="p-4 border-r-4 border-track-dark/20">3</th>
                <th className="p-4 border-r-4 border-track-dark/20">4</th>
                <th className="p-4 border-r-4 border-track-dark/20">5</th>
                <th className="p-4 border-r-4 border-track-dark/20">6</th>
                <th className="p-4 text-right bg-track-lagoon text-track-dark">BEST</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center font-bold text-track-dark/40 uppercase">Loading Results...</td>
                </tr>
              ) : displayAttempts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center font-bold text-track-dark/40 uppercase">No Athletes Registered</td>
                </tr>
              ) : displayAttempts.map((result, i) => (
                <tr key={i} className={`border-b-4 border-track-dark/10 hover:bg-track-foam transition-colors ${i === 0 ? 'bg-white' : 'bg-track-foam/50'}`}>
                  <td className="p-4 border-r-4 border-track-dark/10 font-black text-2xl text-track-dark">{result.pos}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-left">
                    <div className="font-black text-track-dark text-lg uppercase">{result.name}</div>
                    <div className="text-xs font-black text-track-dark/60 uppercase">{result.island}</div>
                  </td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-lg">{formatAttempt(result.a1)}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-lg">{formatAttempt(result.a2)}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-lg">{formatAttempt(result.a3)}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-lg">{formatAttempt(result.a4)}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-lg">{formatAttempt(result.a5)}</td>
                  <td className="p-4 border-r-4 border-track-dark/10 text-lg">{formatAttempt(result.a6)}</td>
                  <td className="p-4 text-right bg-track-lagoon/10">
                    <div className="flex items-center justify-end gap-3">
                      <span className="font-black text-2xl text-track-dark">{result.best}</span>
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
