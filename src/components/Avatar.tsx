interface AvatarProps {
  skin?: string
  hair?: string
  style?: 'short' | 'long' | 'curly' | 'bald'
  jersey?: string
  number?: string
  bg?: string
  accessory?: 'beard' | 'stubble' | ''
  size?: number
  className?: string
}

export default function Avatar({
  skin = '#c8845a',
  hair = '#1a0f08',
  style = 'short',
  jersey = '#cc2200',
  number = '',
  bg = '#111',
  accessory = '',
  size = 80,
  className = '',
}: AvatarProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="80" height="80" rx="14" fill={bg} />
      {/* Jersey body */}
      <path d="M12 80 Q12 58 20 54 L40 60 L60 54 Q68 58 68 80Z" fill={jersey} opacity=".95" />
      {number && (
        <text x="40" y="75" textAnchor="middle" fill="rgba(255,255,255,.4)"
          fontFamily="monospace" fontWeight="700" fontSize="8">{number}</text>
      )}
      {/* Neck */}
      <rect x="33" y="47" width="14" height="12" rx="4" fill={skin} />
      {/* Head */}
      <ellipse cx="40" cy="34" rx="17" ry="18" fill={skin} />
      {/* Ears */}
      <ellipse cx="23" cy="34" rx="4.5" ry="5.5" fill={skin} />
      <ellipse cx="57" cy="34" rx="4.5" ry="5.5" fill={skin} />
      {/* Hair */}
      {style === 'short' && (
        <path d="M23 28 Q22 13 40 12 Q58 13 57 28 Q52 20 40 20 Q28 20 23 28Z" fill={hair} />
      )}
      {style === 'curly' && (
        <>
          <path d="M23 29 Q20 11 40 10 Q60 11 57 29 Q50 17 40 17 Q30 17 23 29Z" fill={hair} />
          <circle cx="24" cy="24" r="5" fill={hair} />
          <circle cx="56" cy="24" r="5" fill={hair} />
          <circle cx="32" cy="16" r="5" fill={hair} />
          <circle cx="48" cy="16" r="5" fill={hair} />
        </>
      )}
      {style === 'long' && (
        <>
          <path d="M23 28 Q21 12 40 11 Q59 12 57 28 Q52 19 40 19 Q28 19 23 28Z" fill={hair} />
          <rect x="18" y="26" width="7" height="24" rx="3.5" fill={hair} />
          <rect x="55" y="26" width="7" height="24" rx="3.5" fill={hair} />
        </>
      )}
      {style === 'bald' && (
        <ellipse cx="40" cy="22" rx="17" ry="9" fill={skin} opacity=".3" />
      )}
      {/* Eyebrows */}
      <path d="M28 27 Q33 25.5 38 27" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M42 27 Q47 25.5 52 27" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
      {/* Eye whites */}
      <ellipse cx="33" cy="32" rx="4.5" ry="5" fill="white" />
      <ellipse cx="47" cy="32" rx="4.5" ry="5" fill="white" />
      {/* Irises */}
      <circle cx="33.8" cy="33" r="2.8" fill="#1a0a0a" />
      <circle cx="47.8" cy="33" r="2.8" fill="#1a0a0a" />
      {/* Pupils */}
      <circle cx="33.8" cy="33" r="1.4" fill="#050505" />
      <circle cx="47.8" cy="33" r="1.4" fill="#050505" />
      {/* Eye shine */}
      <circle cx="34.8" cy="31.8" r=".9" fill="white" />
      <circle cx="48.8" cy="31.8" r=".9" fill="white" />
      {/* Nose */}
      <path d="M38.5 36 Q40 40 41.5 36" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
      {/* Mouth */}
      <path d="M34.5 43 Q40 47.5 45.5 43" stroke="#8b4040" strokeWidth="1.8"
        strokeLinecap="round" fill="none" />
      {/* Accessories */}
      {accessory === 'beard' && (
        <path d="M28 41 Q40 52 52 41 Q47 48 40 50 Q33 48 28 41Z"
          fill={hair} opacity=".65" />
      )}
      {accessory === 'stubble' && (
        <ellipse cx="40" cy="45" rx="11" ry="5.5" fill={hair} opacity=".2" />
      )}
    </svg>
  )
}
