/**
 * Lakshadweep Islands – SVG Map Background
 * Simplified island silhouettes positioned geographically relative to each other.
 * Used as a decorative background element.
 */
export default function LakshadweepMap({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 700"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Amini – northernmost */}
      <ellipse cx="200" cy="60" rx="18" ry="9" fill="currentColor" transform="rotate(-20 200 60)" />
      
      {/* Kadmat */}
      <ellipse cx="185" cy="115" rx="7" ry="28" fill="currentColor" transform="rotate(-8 185 115)" />
      
      {/* Chetlat */}
      <ellipse cx="220" cy="140" rx="12" ry="6" fill="currentColor" transform="rotate(15 220 140)" />

      {/* Bitra – tiny */}
      <ellipse cx="250" cy="165" rx="5" ry="3" fill="currentColor" />

      {/* Kiltan */}
      <ellipse cx="178" cy="200" rx="7" ry="20" fill="currentColor" transform="rotate(-5 178 200)" />
      
      {/* Kavaratti – capital */}
      <g>
        <ellipse cx="210" cy="270" rx="20" ry="11" fill="currentColor" transform="rotate(-10 210 270)" />
        {/* dot to mark capital */}
        <circle cx="210" cy="270" r="4" fill="currentColor" opacity="0.6" />
      </g>

      {/* Agatti */}
      <ellipse cx="175" cy="310" rx="6" ry="30" fill="currentColor" transform="rotate(-3 175 310)" />

      {/* Bangaram – small atoll */}
      <ellipse cx="165" cy="355" rx="9" ry="5" fill="currentColor" transform="rotate(20 165 355)" />

      {/* Androth – largest by land area */}
      <ellipse cx="205" cy="370" rx="15" ry="34" fill="currentColor" transform="rotate(-6 205 370)" />

      {/* Kalpeni */}
      <ellipse cx="190" cy="450" rx="11" ry="7" fill="currentColor" transform="rotate(10 190 450)" />

      {/* Suheli – two islets */}
      <ellipse cx="172" cy="490" rx="8" ry="4" fill="currentColor" transform="rotate(-15 172 490)" />
      <ellipse cx="186" cy="500" rx="5" ry="3" fill="currentColor" transform="rotate(5 186 500)" />

      {/* Minicoy – southernmost, different shape */}
      <ellipse cx="210" cy="610" rx="10" ry="38" fill="currentColor" transform="rotate(-2 210 610)" />
      <ellipse cx="214" cy="648" rx="14" ry="6" fill="currentColor" />

      {/* Laccadive Sea wave lines – subtle ocean suggestion */}
      <path d="M80 350 Q130 340 180 350 Q230 360 280 350" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M90 400 Q140 390 190 400 Q240 410 290 400" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
      <path d="M100 450 Q150 440 200 450 Q250 460 300 450" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15" />
    </svg>
  );
}
