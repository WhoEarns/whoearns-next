interface AvatarProps {
  skin?: string | null
  hair?: string | null
  style?: 'short' | 'long' | 'curly' | 'bald' | null
  jersey?: string | null
  number?: string | null
  bg?: string | null
  accessory?: 'beard' | 'stubble' | '' | null
  size?: number
  className?: string
  name?: string
}

function nameToColor(name: string): string {
  const colors = ['#635bff','#f59e0b','#10b981','#3b82f6','#ec4899','#8b5cf6','#ef4444','#06b6d4','#84cc16','#f97316']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Avatar({
  skin,
  hair = '#1a0f08',
  style = 'short',
  jersey = '#cc2200',
  number = '',
  bg = '#111',
  accessory = '',
  size = 80,
  className = '',
  name = '',
}: AvatarProps) {

  // Initials fallback when avatar fields are null/empty
  if (!skin) {
    const initials = name ? getInitials(name) : '?'
    const accent = name ? nameToColor(name) : '#635bff'
    const fontSize = size * 0.36
    const r = size * 0.175
    return (
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <rect width={size} height={size} rx={r} fill={accent} opacity="0.15" />
        <rect width={size} height={size} rx={r} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.4" />
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" fill={accent} fontFamily="'Outfit', system-ui, sans-serif" fontWeight="700" fontSize={fontSize}>{initials}</text>
      </svg>
    )
  }

  // Resolve all nullable props to strings for SVG
  const _skin = skin
  const _hair = hair ?? '#1a0f08'
  const _jersey = jersey ?? '#cc2200'
  const _bg = bg ?? '#111'
  const _number = number ?? ''
  const _accessory = accessory ?? ''

  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size} className={className} aria-hidden="true">
      <rect width="80" height="80" rx="14" fill={_bg} />
      <path d="M12 80 Q12 58 20 54 L40 60 L60 54 Q68 58 68 80Z" fill={_jersey} opacity=".95" />
      {_number && (
        <text x="40" y="75" textAnchor="middle" fill="rgba(255,255,255,.4)" fontFamily="monospace" fontWeight="700" fontSize="8">{_number}</text>
      )}
      <rect x="33" y="47" width="14" height="12" rx="4" fill={_skin} />
      <ellipse cx="40" cy="34" rx="17" ry="18" fill={_skin} />
      <ellipse cx="23" cy="34" rx="4.5" ry="5.5" fill={_skin} />
      <ellipse cx="57" cy="34" rx="4.5" ry="5.5" fill={_skin} />
      {style === 'short' && <path d="M23 28 Q22 13 40 12 Q58 13 57 28 Q52 20 40 20 Q28 20 23 28Z" fill={_hair} />}
      {style === 'curly' && <>
        <path d="M23 29 Q20 11 40 10 Q60 11 57 29 Q50 17 40 17 Q30 17 23 29Z" fill={_hair} />
        <circle cx="24" cy="24" r="5" fill={_hair} />
        <circle cx="56" cy="24" r="5" fill={_hair} />
        <circle cx="32" cy="16" r="5" fill={_hair} />
        <circle cx="48" cy="16" r="5" fill={_hair} />
      </>}
      {style === 'long' && <>
        <path d="M23 28 Q21 12 40 11 Q59 12 57 28 Q52 19 40 19 Q28 19 23 28Z" fill={_hair} />
        <rect x="18" y="26" width="7" height="24" rx="3.5" fill={_hair} />
        <rect x="55" y="26" width="7" height="24" rx="3.5" fill={_hair} />
      </>}
      {style === 'bald' && <ellipse cx="40" cy="22" rx="17" ry="9" fill={_skin} opacity=".3" />}
      <path d="M28 27 Q33 25.5 38 27" stroke={_hair} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M42 27 Q47 25.5 52 27" stroke={_hair} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="33" cy="32" rx="4.5" ry="5" fill="white" />
      <ellipse cx="47" cy="32" rx="4.5" ry="5" fill="white" />
      <circle cx="33.8" cy="33" r="2.8" fill="#1a0a0a" />
      <circle cx="47.8" cy="33" r="2.8" fill="#1a0a0a" />
      <circle cx="33.8" cy="33" r="1.4" fill="#050505" />
      <circle cx="47.8" cy="33" r="1.4" fill="#050505" />
      <circle cx="34.8" cy="31.8" r=".9" fill="white" />
      <circle cx="48.8" cy="31.8" r=".9" fill="white" />
      <path d="M38.5 36 Q40 40 41.5 36" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M34.5 43 Q40 47.5 45.5 43" stroke="#8b4040" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {_accessory === 'beard' && <path d="M28 41 Q40 52 52 41 Q47 48 40 50 Q33 48 28 41Z" fill={_hair} opacity=".65" />}
      {_accessory === 'stubble' && <ellipse cx="40" cy="45" rx="11" ry="5.5" fill={_hair} opacity=".2" />}
    </svg>
  )
}
