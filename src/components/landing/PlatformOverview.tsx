import { motion } from 'framer-motion';
import { Activity, Target, Video, Camera, LineChart, Trophy } from 'lucide-react';

const features = [
  {
    num: '01',
    title: 'TRACK EVENTS',
    icon: Activity,
    color: 'bg-track-lagoon text-track-dark',
    desc: 'Virtual finish line analysis and automatic timing. Photo finish, split-time recording, and official race-result generation.',
  },
  {
    num: '02',
    title: 'FIELD EVENTS',
    icon: Target,
    color: 'bg-track-coral text-white',
    desc: 'Digital scorecards with performance detection, automatic ranking, and athlete performance tracking.',
  },
  {
    num: '03',
    title: 'LIVE CAMERA ANALYSIS',
    icon: Video,
    color: 'bg-[#FFEB3B] text-track-dark',
    desc: 'Real-time detection of lane allocations, race scheduling, automatic timing, and lane competition detection.',
  },
  {
    num: '04',
    title: 'PHOTO FINISH SYSTEM',
    icon: Camera,
    color: 'bg-[#9C27B0] text-white',
    desc: 'Sub-millisecond resolution finish line imagery powered by computer vision. Achieve officiating accuracy with Photo Finish.',
  },
  {
    num: '05',
    title: 'ATHLETE ANALYTICS',
    icon: LineChart,
    color: 'bg-[#4CAF50] text-white',
    desc: 'Deep analysis, team scheduling, personal records, performance trends, event validations, and athlete development tracking.',
  },
  {
    num: '06',
    title: 'COMPETITION MANAGEMENT',
    icon: Trophy,
    color: 'bg-track-dark text-white',
    desc: 'End-to-end event organisation, file allocation, athletics identification, start files, final results and competition reporting.',
  },
];

export default function PlatformOverview() {
  return (
    <section id="features" className="py-20 bg-track-foam border-t-8 border-track-dark">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
          <div className="flex items-start gap-6">
            {/* Vertical label */}
            <div className="hidden md:flex flex-col items-center gap-3 pt-1">
              <div className="w-1 h-16 bg-track-coral" />
              <span
                className="text-xs font-black text-track-dark/40 uppercase tracking-[0.35em] whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                PLATFORM ARSENAL
              </span>
            </div>
            <div>
              <div className="text-xs font-black text-track-dark/40 uppercase tracking-[0.35em] mb-3 md:hidden">PLATFORM ARSENAL</div>
              <h2 className="text-6xl md:text-8xl editorial-heading text-track-dark leading-none">
                WHAT WE<br /><span className="text-track-coral">DELIVER</span>
              </h2>
            </div>
          </div>
          <p className="max-w-sm text-lg font-bold text-track-dark/60 uppercase leading-snug border-l-8 border-track-coral pl-4 self-end">
            Everything you need to manage world-class athletics competitions.
          </p>
        </div>

        {/* 2×3 numbered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t-4 border-l-4 border-track-dark">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="border-b-4 border-r-4 border-track-dark p-8 bg-white hover:bg-track-foam transition-colors group will-change-transform relative overflow-hidden"
            >
              {/* Large number watermark */}
              <div className="absolute -right-4 -top-6 text-[100px] font-black text-track-dark opacity-[0.04] leading-none select-none pointer-events-none editorial-heading-bebas">
                {feature.num}
              </div>

              {/* Number + icon row */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl editorial-heading-bebas text-track-dark/20 leading-none">{feature.num}</span>
                <div className={`w-14 h-14 flex items-center justify-center border-4 border-track-dark transform -skew-x-6 shadow-[4px_4px_0px_#010F1A] ${feature.color}`}>
                  <feature.icon className="w-7 h-7 stroke-[2.5]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black uppercase tracking-tight text-track-dark mb-3 group-hover:text-track-coral transition-colors leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-track-dark/60 font-bold text-sm leading-relaxed uppercase">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
