/**
 * HeroVisual – Lakshadweep Map + Athletics Track Composition
 * A fully self-contained SVG graphic combining island silhouettes
 * with running track lanes, timing data, and sports analytics UI.
 * No external image dependency.
 */
export default function HeroVisual() {
  return (
    <svg
      viewBox="0 0 500 660"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Lakshadweep Islands — Athletics Intelligence Platform"
    >
      {/* ── Background ── */}
      <rect width="500" height="660" fill="#010F1A" />

      {/* ── Diagonal speed-lines ── */}
      {[0, 1, 2, 3, 4].map(i => (
        <line
          key={i}
          x1={-50 + i * 110} y1="0"
          x2={150 + i * 110} y2="660"
          stroke="#00C8C8" strokeWidth="0.5" opacity="0.08"
        />
      ))}

      {/* ── Lakshadweep island map (to scale, north–south arrangement) ── */}
      {/* Chetlat */}
      <ellipse cx="290" cy="90"  rx="18" ry="8"  fill="#00C8C8" opacity="0.7" transform="rotate(-15 290 90)" />

      {/* Amini */}
      <ellipse cx="260" cy="118" rx="22" ry="10" fill="#00C8C8" opacity="0.7" transform="rotate(-20 260 118)" />

      {/* Kadmat – elongated */}
      <ellipse cx="248" cy="170" rx="8"  ry="34" fill="#00C8C8" opacity="0.7" transform="rotate(-6 248 170)" />

      {/* Kiltan */}
      <ellipse cx="235" cy="225" rx="7"  ry="24" fill="#00C8C8" opacity="0.7" transform="rotate(-4 235 225)" />

      {/* Bitra – tiny dot */}
      <circle cx="308" cy="200" r="5" fill="#00C8C8" opacity="0.5" />

      {/* Kavaratti – capital, slightly larger */}
      <ellipse cx="272" cy="295" rx="24" ry="13" fill="#00C8C8" opacity="0.9" transform="rotate(-12 272 295)" />
      {/* Capital marker */}
      <circle cx="272" cy="295" r="5" fill="#FF7A45" opacity="1" />
      <circle cx="272" cy="295" r="9" fill="none" stroke="#FF7A45" strokeWidth="2" opacity="0.6" />

      {/* Agatti */}
      <ellipse cx="232" cy="348" rx="7"  ry="38" fill="#00C8C8" opacity="0.75" transform="rotate(-3 232 348)" />

      {/* Bangaram – atoll */}
      <ellipse cx="220" cy="400" rx="12" ry="6"  fill="#00C8C8" opacity="0.5" transform="rotate(18 220 400)" />

      {/* Androth – largest land area */}
      <ellipse cx="265" cy="422" rx="17" ry="42" fill="#00C8C8" opacity="0.8" transform="rotate(-5 265 422)" />

      {/* Kalpeni */}
      <ellipse cx="248" cy="505" rx="14" ry="8"  fill="#00C8C8" opacity="0.6" transform="rotate(12 248 505)" />

      {/* Suheli – two islets */}
      <ellipse cx="228" cy="538" rx="9"  ry="5"  fill="#00C8C8" opacity="0.5" transform="rotate(-14 228 538)" />
      <ellipse cx="242" cy="549" rx="6"  ry="3"  fill="#00C8C8" opacity="0.4" />

      {/* Minicoy – southernmost, distinct teardrop */}
      <ellipse cx="268" cy="610" rx="13" ry="42" fill="#00C8C8" opacity="0.8" transform="rotate(-2 268 610)" />
      <ellipse cx="273" cy="648" rx="18" ry="7"  fill="#00C8C8" opacity="0.6" />
      {/* Minicoy marker – Mubassina's home */}
      <circle cx="270" cy="615" r="5" fill="#FF7A45" />
      <circle cx="270" cy="615" r="10" fill="none" stroke="#FF7A45" strokeWidth="2" opacity="0.5" />

      {/* ── Sea wave lines ── */}
      {[340, 390, 440].map((y, i) => (
        <path
          key={i}
          d={`M120 ${y} Q200 ${y - 10} 280 ${y} Q360 ${y + 10} 420 ${y}`}
          stroke="#00C8C8" strokeWidth="1" fill="none" opacity={0.12 - i * 0.03}
        />
      ))}

      {/* ── Track overlay – top-left corner ── */}
      {/* Lane 1 */}
      <rect x="20" y="20" width="80" height="7" rx="2" fill="#F8FAFC" opacity="0.06" />
      <rect x="20" y="31" width="80" height="7" rx="2" fill="#F8FAFC" opacity="0.04" />
      <rect x="20" y="42" width="80" height="7" rx="2" fill="#F8FAFC" opacity="0.03" />
      {/* Finish line tick */}
      <rect x="20" y="18" width="3" height="35" fill="#FF7A45" opacity="0.7" />

      {/* ── HUD: timing panel – bottom left ── */}
      <rect x="18" y="580" width="160" height="62" fill="#00C8C8" opacity="1" />
      <rect x="18" y="580" width="160" height="62" fill="none" stroke="#010F1A" strokeWidth="4" />
      <text x="30" y="601" fill="#010F1A" fontSize="9" fontFamily="Anton, sans-serif" fontWeight="900" letterSpacing="2">FINISH TIME</text>
      <text x="30" y="630" fill="#010F1A" fontSize="28" fontFamily="Anton, sans-serif" fontWeight="900">9.862<tspan fontSize="16">s</tspan></text>

      {/* ── HUD: speed panel – top right ── */}
      <rect x="340" y="18" width="145" height="52" fill="#FF7A45" opacity="1" />
      <rect x="340" y="18" width="145" height="52" fill="none" stroke="#010F1A" strokeWidth="4" />
      <text x="352" y="38" fill="white" fontSize="9" fontFamily="Anton, sans-serif" fontWeight="900" letterSpacing="2">PEAK SPEED</text>
      <text x="352" y="62" fill="white" fontSize="22" fontFamily="Anton, sans-serif" fontWeight="900">44.2 KM/H</text>

      {/* ── Label: Kavaratti capital ── */}
      <rect x="292" y="283" width="90" height="22" fill="#010F1A" opacity="0.85" />
      <text x="298" y="298" fill="#00C8C8" fontSize="9" fontFamily="Anton, sans-serif" fontWeight="900" letterSpacing="1.5">KAVARATTI ★</text>

      {/* ── Label: Minicoy (Mubassina's island) ── */}
      <rect x="285" y="600" width="120" height="22" fill="#FF7A45" opacity="1" />
      <rect x="285" y="600" width="120" height="22" fill="none" stroke="#010F1A" strokeWidth="2" />
      <text x="292" y="615" fill="white" fontSize="9" fontFamily="Anton, sans-serif" fontWeight="900" letterSpacing="1.5">MINICOY ISLAND</text>

      {/* ── Compass rose – bottom right ── */}
      <g transform="translate(440, 580)">
        <circle r="24" fill="none" stroke="#F8FAFC" strokeWidth="2" opacity="0.15" />
        <text x="0" y="-12" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily="Anton" opacity="0.5">N</text>
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#F8FAFC" strokeWidth="1.5" opacity="0.3" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#F8FAFC" strokeWidth="1.5" opacity="0.3" />
        <polygon points="0,-8 -3,0 3,0" fill="#00C8C8" opacity="0.7" />
      </g>

      {/* ── Title text watermark ── */}
      <text
        x="250" y="265"
        textAnchor="middle"
        fill="#F8FAFC"
        fontSize="11"
        fontFamily="Anton, sans-serif"
        letterSpacing="6"
        opacity="0.08"
        transform="rotate(-90 250 265)"
      >
        LAKSHADWEEP ARCHIPELAGO
      </text>

      {/* ── Stat: 36 islands ── */}
      <rect x="18" y="510" width="120" height="52" fill="none" stroke="#00C8C8" strokeWidth="3" opacity="0.5" />
      <text x="30" y="533" fill="#00C8C8" fontSize="9" fontFamily="Anton, sans-serif" fontWeight="900" letterSpacing="2" opacity="0.7">TOTAL ISLANDS</text>
      <text x="30" y="557" fill="#F8FAFC" fontSize="26" fontFamily="Anton, sans-serif" fontWeight="900" opacity="0.9">36</text>

      {/* ── Stat: km from mainland ── */}
      <rect x="18" y="448" width="130" height="52" fill="none" stroke="#FF7A45" strokeWidth="3" opacity="0.4" />
      <text x="30" y="470" fill="#FF7A45" fontSize="9" fontFamily="Anton, sans-serif" fontWeight="900" letterSpacing="2" opacity="0.7">KM FROM MAINLAND</text>
      <text x="30" y="494" fill="#F8FAFC" fontSize="26" fontFamily="Anton, sans-serif" fontWeight="900" opacity="0.9">220+</text>

      {/* ── Border frame ── */}
      <rect x="4" y="4" width="492" height="652" fill="none" stroke="#00C8C8" strokeWidth="3" opacity="0.15" />
    </svg>
  );
}
