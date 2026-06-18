import { Pause, SkipBack, SkipForward, Frame, Scissors, Check, Crosshair } from 'lucide-react';

export default function VideoAnalysis() {
  return (
    <div className="pb-10 pt-4 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl editorial-heading-bebas text-track-dark leading-none">VAR ANALYSIS</h1>
          <p className="text-xl font-black text-track-dark/60 uppercase tracking-widest border-l-4 border-track-coral pl-3 mt-2">Official photo finish verification.</p>
        </div>
        <div className="flex gap-4">
          <button className="brutal-button bg-white text-track-dark px-6 py-3 shadow-[4px_4px_0px_#010F1A]">
            <Scissors className="w-5 h-5 mr-2 stroke-[3]" /> Export Clip
          </button>
          <button className="brutal-button bg-track-coral text-white px-6 py-3 shadow-[4px_4px_0px_#010F1A]">
            <Check className="w-5 h-5 mr-2 stroke-[3]" /> Verify Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
          <div className="brutal-card p-4">
            <div className="relative border-4 border-track-dark bg-track-dark overflow-hidden group">
              {/* Main Photo Finish Area */}
              <div className="h-[400px] w-full relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1552674605-15c2145efa38?auto=format&fit=crop&q=80&w=1200&h=400" 
                  alt="Photo Finish" 
                  className="w-full h-full object-cover"
                />
                
                {/* Red Finish Line Overlay */}
                <div className="absolute top-0 bottom-0 left-[65%] w-1 bg-track-coral shadow-[0_0_15px_rgba(255,122,69,1)] z-10 cursor-ew-resize hover:w-2 transition-all group/line">
                  <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-5 h-5 bg-white border-2 border-track-coral rounded-full opacity-0 group-hover/line:opacity-100 flex items-center justify-center">
                    <Crosshair className="w-3 h-3 text-track-coral" />
                  </div>
                </div>

                {/* Simulated Time Scale */}
                <div className="absolute bottom-0 inset-x-0 h-8 bg-track-dark/90 flex text-[10px] font-black text-white px-2">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end border-l border-white/20 pb-1 pl-1">
                      9.{80 + i}s
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Controls */}
              <div className="bg-white p-4 flex items-center justify-between border-t-4 border-track-dark">
                <div className="flex gap-2">
                  <button className="brutal-button bg-track-foam p-3 hover:bg-track-lagoon shadow-[4px_4px_0px_#010F1A]">
                    <SkipBack className="w-5 h-5 stroke-[3]" />
                  </button>
                  <button className="brutal-button bg-track-foam p-3 hover:bg-track-coral hover:text-white shadow-[4px_4px_0px_#010F1A]">
                    <Pause className="w-5 h-5 stroke-[3]" />
                  </button>
                  <button className="brutal-button bg-track-foam p-3 hover:bg-track-lagoon shadow-[4px_4px_0px_#010F1A]">
                    <SkipForward className="w-5 h-5 stroke-[3]" />
                  </button>
                </div>
                
                <div className="flex-1 mx-8 relative flex items-center">
                  <div className="w-full h-4 bg-track-dark border-2 border-track-dark relative cursor-pointer">
                    <div className="absolute top-0 bottom-0 left-0 w-[65%] bg-track-lagoon"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-[65%] w-6 h-8 bg-track-coral border-2 border-track-dark transform -skew-x-12 -ml-3 shadow-[2px_2px_0px_#010F1A]"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="brutal-button bg-track-foam p-3 hover:bg-track-lagoon shadow-[4px_4px_0px_#010F1A]">
                    <Frame className="w-5 h-5 stroke-[3]" />
                  </button>
                  <div className="font-black text-2xl text-track-dark border-4 border-track-dark px-3 py-1 transform -skew-x-6">
                    9.862<span className="text-track-coral">s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="brutal-card p-0 h-full flex flex-col">
            <div className="p-4 border-b-8 border-track-dark bg-track-coral">
              <h3 className="font-black text-3xl editorial-heading-bebas text-white">OFFICIAL RANKING</h3>
            </div>
            <div className="p-4 space-y-3 bg-white flex-1">
              {[
                { pos: 1, lane: 4, name: "M. JOHNSON", time: "9.862", diff: "-" },
                { pos: 2, lane: 5, name: "A. DE GRASSE", time: "9.868", diff: "+0.006" },
                { pos: 3, lane: 3, name: "C. COLEMAN", time: "9.891", diff: "+0.029" },
                { pos: 4, lane: 6, name: "F. OMANYALA", time: "9.924", diff: "+0.062" },
                { pos: 5, lane: 2, name: "A. SIMBINE", time: "9.931", diff: "+0.069" },
              ].map((result, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 border-4 border-track-dark ${i === 0 ? 'bg-track-lagoon' : 'bg-track-foam'} hover:-translate-y-1 hover:shadow-[4px_4px_0px_#010F1A] transition-all cursor-pointer`}>
                  <div className={`w-8 h-8 flex items-center justify-center font-black text-lg transform -skew-x-6 ${i === 0 ? 'bg-track-dark text-track-lagoon' : 'bg-track-dark text-white'}`}>
                    {result.pos}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-black text-track-dark uppercase text-sm">{result.name}</span>
                      <span className="font-black text-lg">{result.time}s</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-track-dark/60 font-bold">LANE {result.lane}</span>
                      <span className="text-track-coral font-black">{result.diff}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
