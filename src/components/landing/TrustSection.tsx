export default function TrustSection() {
  const partners = [
    "WORLD ATHLETICS", "OLYMPIC COMMITTEE", "NATIONAL SPORTS UNIVERSITY", 
    "ELITE ATHLETICS CLUB", "STATE CHAMPIONSHIPS", "GLOBAL TIMING SYSTEMS"
  ];

  return (
    <div className="py-12 border-y-8 border-track-dark bg-track-lagoon relative z-10 overflow-hidden shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)]">
      {/* Repeating background text */}
      <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 items-center justify-center pointer-events-none select-none">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="text-4xl editorial-heading-bebas text-track-dark whitespace-nowrap">TRUSTED BY ELITE</span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="text-2xl font-black text-track-dark uppercase tracking-tight hover:scale-110 transition-transform cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
