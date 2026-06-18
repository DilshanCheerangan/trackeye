import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const ATHLETE_IMAGE = '/ChatGPT Image Jun 18, 2026, 06_14_47 AM.png';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-track-foam overflow-hidden pt-16 flex items-center">

      {/* ══════════════════════════════════════════════
          FULL-WIDTH ATHLETE IMAGE — spans entire hero
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {/* Orange accent block behind athlete's torso */}
        <div
          className="absolute bg-track-coral z-[1]"
          style={{ top: '5%', right: '5%', width: '200px', bottom: '8%' }}
        />

        {/* Athlete image — full bleed across entire hero */}
        <motion.img
          src={ATHLETE_IMAGE}
          alt="Sprinter at peak speed — TrackEye AI Athletics"
          className="absolute inset-0 w-full h-full object-cover z-[2]"
          style={{ objectPosition: '70% top' }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
        />

        {/* LEFT fade — white gradient so text is readable over the image */}
        <div className="absolute inset-y-0 left-0 w-[55%] z-[3]
          bg-gradient-to-r from-track-foam via-track-foam/95 to-transparent" />

        {/* TOP subtle vignette */}
        <div className="absolute inset-x-0 top-0 h-32 z-[3]
          bg-gradient-to-b from-track-foam/60 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════
          TEXT CONTENT — floats over image on the left
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-14 py-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="will-change-transform w-full lg:w-[52%]"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-[3px] bg-track-coral" />
            <span className="text-xs font-black text-track-dark/60 uppercase tracking-[0.3em]">
              Next-Gen Sports Technology
            </span>
          </div>

          {/* Main headline */}
          <h1 className="editorial-heading leading-[0.82] mb-5">
            <span className="block text-[72px] md:text-[90px] lg:text-[108px] text-track-dark drop-shadow-sm">TRACKEYE</span>
            <span className="block text-[72px] md:text-[90px] lg:text-[108px] text-track-coral drop-shadow-sm">AI ATHLETICS</span>
            <span className="block text-[72px] md:text-[90px] lg:text-[108px] text-track-dark drop-shadow-sm">COMMAND CENTER</span>
          </h1>

          {/* Subtitle */}
          <p className="text-track-dark/85 font-bold text-base leading-snug mb-2 max-w-lg">
            Everything You Need To Manage World-Class Athletics Competitions.
          </p>
          <p className="text-track-dark/55 font-bold text-sm leading-relaxed mb-8 max-w-md">
            From photo finish analysis and automatic timing to athlete performance landscapes and competition management.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard?demo=false"
              className="brutal-button bg-track-coral text-white px-6 py-3 text-sm uppercase tracking-widest font-black flex items-center gap-3 group shadow-[5px_5px_0px_#010F1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              LAUNCH PLATFORM
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard?demo=true"
              className="brutal-button bg-white text-track-dark px-6 py-3 text-sm uppercase tracking-widest font-black flex items-center gap-3 shadow-[5px_5px_0px_#010F1A] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-4 border-track-dark"
            >
              <Play className="w-4 h-4 fill-track-dark stroke-[2.5]" />
              TRY DEMO
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          HUD OVERLAYS — float on top of everything
      ══════════════════════════════════════════════ */}

      {/* PRECISION / PERFORMANCE / INTELLIGENCE — top right */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute top-20 right-6 z-20 bg-track-dark/90 border-l-4 border-track-coral px-5 py-4"
      >
        <p className="text-track-coral  font-black text-xs uppercase tracking-[0.22em] leading-loose">PRECISION.</p>
        <p className="text-white        font-black text-xs uppercase tracking-[0.22em] leading-loose">PERFORMANCE.</p>
        <p className="text-track-lagoon font-black text-xs uppercase tracking-[0.22em] leading-loose">INTELLIGENCE.</p>
      </motion.div>

      {/* Speed tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute z-20 bg-track-lagoon text-track-dark font-black px-4 py-2 text-sm uppercase border-4 border-track-dark shadow-[4px_4px_0px_#010F1A] transform -skew-x-6"
        style={{ bottom: '28%', right: '38%' }}
      >
        SPEED: 44.2 KM/H
      </motion.div>

      {/* Finish time card — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="absolute bottom-6 right-5 z-20 bg-track-dark border-4 border-track-lagoon p-4 shadow-[6px_6px_0px_#00C8C8]"
      >
        <p className="text-track-lagoon font-black text-[10px] uppercase tracking-[0.3em] mb-1">TO THE WORLD</p>
        <p className="text-white font-black text-3xl editorial-heading-bebas leading-none">
          9.862<span className="text-xl text-track-lagoon">s</span>
        </p>
      </motion.div>
    </div>
  );
}
