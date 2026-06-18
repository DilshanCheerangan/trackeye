import { motion } from 'framer-motion';
import { Award, MapPin, ExternalLink, Trophy, Calendar, Globe } from 'lucide-react';

/**
 * Real athletes from Lakshadweep, India.
 * Sources: Wikipedia, Lakshadweep Athletics Association (lakathletics.com),
 * World Athletics, Tribune India, The Hindu, Indian Express.
 */
const athletes = [
  {
    name: "MUBASSINA MOHAMMED",
    island: "MINICOY, LAKSHADWEEP",
    born: "FEB 22, 2006",
    event: "LONG JUMP · HEPTATHLON",
    pb: "6.38M",
    pbNote: "Indian Open Jumps, Mar 2026",
    coach: "ANJU BOBBY GEORGE FOUNDATION",
    medals: [
      "🥈 Asian U18 Championships — Long Jump, Kuwait 2022",
      "🥈 Asian U18 Championships — Heptathlon, Kuwait 2022",
      "🥇 Indian Open Jumps Competition, 2026",
      "🥈 South Asian Senior Athletics Championships — Long Jump, 2025",
    ],
    bio: "First athlete from Lakshadweep to win an international medal for India. Trained on a 200m mud track before reaching the Asian podium.",
    wikiUrl: "https://en.wikipedia.org/wiki/Mubassina_Mohammed",
    // Long jump action shot — tropical venue
    image: "/mubassina.jpg",
    imageAlt: "Mubassina Mohammed",
    color: "bg-track-lagoon",
    objectPosition: "top",
  },
  {
    name: "MUNSIRA MUNEER U.K.",
    island: "LAKSHADWEEP",
    born: "c. 2007",
    event: "BALL THROW · FIELD EVENTS",
    pb: "34.5M",
    pbNote: "South Zone National Jr. Championship, 2021",
    coach: "LAKSHADWEEP ATHLETICS ASSOCIATION",
    medals: [
      "🥇 First-ever Gold Medal for Lakshadweep Athletics",
      "South Zone National Junior Championship — Ball Throw (U14), 2021",
      "🏅 4th Asian Youth Athletics Championships — Kuwait, 2022",
    ],
    bio: "Historic gold medallist who put Lakshadweep on the national athletics map. Pioneer of the island's youth field-events programme.",
    wikiUrl: "https://lakathletics.com",
    image: "/munsira muneer.png",
    imageAlt: "Munsira Muneer U.K.",
    color: "bg-track-coral",
  },
  {
    name: "NIHALA K.K.",
    island: "LAKSHADWEEP",
    born: "c. 2007",
    event: "BALL THROW · SPRINTS",
    pb: "—",
    pbNote: "South Zone National Jr. Championship, 2021",
    coach: "LAKSHADWEEP ATHLETICS ASSOCIATION",
    medals: [
      "🥈 First-ever Silver Medal for Lakshadweep Athletics",
      "South Zone National Junior Championship — Ball Throw (U14), 2021",
      "🏅 4th Asian Youth Athletics Championships — Kuwait, 2022",
    ],
    bio: "Co-pioneer of Lakshadweep's athletics revolution alongside Mubassina and Munsira. Represents the islands at junior national level.",
    wikiUrl: "https://lakathletics.com",
    image: "/nihala.png",
    imageAlt: "Nihala K.K.",
    color: "bg-track-sand",
    objectPosition: "center 20%",
  }
];

export default function AthleteSection() {
  return (
    <section id="athletes" className="py-24 relative z-10 bg-track-dark overflow-hidden">
      {/* Faint background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <span className="text-[200px] editorial-heading-bebas text-white whitespace-nowrap leading-none">
          LAKSHADWEEP
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-8 border-track-lagoon pb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-track-lagoon stroke-[3]" />
              <span className="text-track-lagoon font-black text-sm uppercase tracking-widest">
                Union Territory of Lakshadweep · India
              </span>
            </div>
            <h2 className="text-6xl md:text-9xl editorial-heading text-white leading-none">
              OUR<br /><span className="text-track-coral">ATHLETES</span>
            </h2>
          </div>
          <div className="max-w-xs border-l-8 border-track-coral pl-6">
            <p className="text-xl font-black text-white/70 uppercase leading-snug mb-4">
              Island champions competing on India's national & international stage.
            </p>
            <a
              href="https://lakathletics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-track-lagoon font-black text-xs uppercase tracking-widest hover:text-track-coral transition-colors border-b-2 border-track-lagoon hover:border-track-coral pb-1"
            >
              Lakshadweep Athletics Association
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {athletes.map((athlete, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
              className="group will-change-transform flex flex-col"
            >
              <div className="border-8 border-white group-hover:-translate-y-4 group-hover:-translate-x-2 transition-all duration-300 shadow-[12px_12px_0px_#00C8C8] group-hover:shadow-[20px_20px_0px_#00C8C8] flex flex-col h-full">

                {/* Clickable image → Wikipedia/source */}
                <a
                  href={athlete.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`View profile of ${athlete.name}`}
                  className="block h-72 overflow-hidden relative border-b-8 border-white grayscale group-hover:grayscale-0 transition-all duration-500 cursor-pointer shrink-0"
                  aria-label={`Open Wikipedia page for ${athlete.name}`}
                >
                  <img
                    src={athlete.image}
                    alt={athlete.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ objectPosition: athlete.objectPosition || 'center' }}
                    loading="lazy"
                  />
                  {/* Dark gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-track-dark to-transparent h-28" />

                  {/* Wikipedia hover badge */}
                  <div className="absolute top-4 right-4 bg-white border-4 border-track-dark px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-[4px_4px_0px_#010F1A]">
                    <ExternalLink className="w-4 h-4 text-track-dark stroke-[3]" />
                    <span className="text-track-dark font-black text-xs uppercase">PROFILE</span>
                  </div>

                  {/* Island tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-track-lagoon text-track-dark font-black px-3 py-1 text-xs uppercase border-2 border-track-dark transform -skew-x-12">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {athlete.island}
                  </div>

                  {/* Event tag */}
                  <div className={`absolute bottom-4 right-4 font-black px-3 py-1 text-xs uppercase border-2 border-track-dark ${athlete.color} ${i === 2 ? 'text-track-dark' : 'text-white'}`}>
                    {athlete.event.split(' · ')[0]}
                  </div>
                </a>

                {/* Info body */}
                <div className="p-6 bg-white flex flex-col flex-1 relative">
                  {/* Award badge */}
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-track-coral border-4 border-track-dark flex items-center justify-center shadow-[4px_4px_0px_#010F1A] group-hover:rotate-12 transition-transform z-10">
                    <Award className="w-6 h-6 text-white stroke-[2.5]" />
                  </div>

                  {/* Name + event */}
                  <h3 className="text-2xl editorial-heading-bebas text-track-dark leading-none mb-1">{athlete.name}</h3>
                  <p className="text-track-coral font-black text-xs tracking-widest uppercase mb-1">{athlete.event}</p>

                  {/* Born + Coach */}
                  <div className="flex flex-wrap gap-4 text-xs font-black text-track-dark/50 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {athlete.born}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> {athlete.coach}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-track-dark/70 font-bold text-sm leading-relaxed mb-4 italic">
                    "{athlete.bio}"
                  </p>

                  {/* Medals list */}
                  <div className="bg-track-dark p-4 mb-5 border-l-4 border-track-lagoon flex flex-col gap-2 flex-1">
                    <p className="text-track-lagoon font-black text-xs uppercase tracking-widest mb-1">KEY ACHIEVEMENTS</p>
                    {athlete.medals.map((medal, m) => (
                      <p key={m} className="text-white text-xs font-bold leading-snug">{medal}</p>
                    ))}
                  </div>

                  {/* PB stat */}
                  <div className="flex border-4 border-track-dark divide-x-4 divide-track-dark">
                    <div className="p-3 flex-1 bg-track-foam">
                      <p className="text-[10px] font-black text-track-dark/50 uppercase tracking-widest mb-1">PERSONAL BEST</p>
                      <p className="text-2xl font-black text-track-dark">{athlete.pb}</p>
                      <p className="text-[9px] font-bold text-track-dark/40 uppercase mt-0.5">{athlete.pbNote}</p>
                    </div>
                    <div className="p-3 flex-1 bg-track-foam flex flex-col justify-end">
                      <a
                        href={athlete.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-black uppercase text-track-coral hover:text-track-dark transition-colors border-b-2 border-track-coral pb-0.5"
                      >
                        Full Profile
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Source credit */}
        <p className="text-center text-white/20 text-xs font-bold uppercase tracking-widest mt-12">
          Data sourced from Wikipedia · Lakshadweep Athletics Association (lakathletics.com) · World Athletics
        </p>
      </div>
    </section>
  );
}
