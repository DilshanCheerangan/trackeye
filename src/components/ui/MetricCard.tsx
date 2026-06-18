import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export default function MetricCard({ title, value, suffix = '', icon, trend, trendUp }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="brutal-card p-6 relative overflow-hidden flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-6 z-10 relative">
        <div className="p-3 bg-track-dark border-4 border-track-dark shadow-[4px_4px_0px_#00C8C8] text-white">
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-black px-3 py-1 border-2 border-track-dark ${trendUp ? 'bg-track-lagoon text-track-dark' : 'bg-track-coral text-white'} transform -skew-x-6`}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="z-10 relative">
        <h3 className="text-sm font-black text-track-dark/60 uppercase tracking-widest mb-1">{title}</h3>
        <div className="text-5xl editorial-heading-bebas text-track-dark leading-none flex items-baseline gap-1">
          <AnimatedCounter value={value} />
          {suffix && <span className="text-3xl text-track-coral">{suffix}</span>}
        </div>
      </div>
      
      {/* Background massive icon */}
      <div className="absolute -right-4 -bottom-8 opacity-5 text-track-dark transform scale-[4] rotate-12 pointer-events-none">
        {icon}
      </div>
    </motion.div>
  );
}
