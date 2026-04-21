// Profile types matching Supabase schema exactly

export interface StatBox {
  label: string
  value: string
  color?: 'gold' | 'green' | 'blue' | 'purple' | ''
  note?: string
  verified?: boolean
  estimated?: boolean
}

export interface SocialLink {
  icon: string
  label: string
  url: string
}

export interface CareerRow {
  club: string
  flag: string
  years: string
  apps: number
  goals: number
  assists: number
}

export interface InfoRow {
  key: string
  value: string
  color?: string
  verified?: boolean
  estimated?: boolean
}

export interface InfoBox {
  title: string
  rows: InfoRow[]
}

export interface AIData {
  name: string
  weakness: string
  market: string
  opportunity: string
  difficulty: string
  build_name: string
  build_description: string
  layout: 'a' | 'b' | 'c' | 'd'
  product_name: string
  product_tagline: string
  product_cta: string
  product_features: string[]
  product_url: string
  product_bg: string
  product_accent: string
}

export interface Profile {
  id: string
  slug: string
  name: string
  category: 'footballer' | 'creator' | 'tech' | 'ai' | 'founder' | 'startup' | 'business' | 'athlete' | 'musician'
  country: string
  flag: string
  tags: Array<{ label: string; type: 's' | 'a' | 'r' | 'c' }>
  meta: string[]
  
  // Key financial
  net_worth?: string
  net_worth_estimated?: boolean
  
  // Social
  social_links: SocialLink[]
  
  // Stats boxes (4)
  stats: StatBox[]
  
  // Career table (footballers/athletes)
  career_table?: CareerRow[]
  career_total_apps?: number
  career_total_goals?: number
  career_total_assists?: number
  
  // Info boxes
  info_box_1?: InfoBox
  info_box_2?: InfoBox
  
  // AI analysis
  ai_enabled: boolean
  ai_data?: AIData
  
  // Settings
  show_claim: boolean
  is_verified: boolean
  last_reviewed: string
  growth?: string
  rank_order: number
  
  // SEO
  seo_title: string
  seo_description: string
  seo_content: string   // Full HTML content for the page body
  
  // Avatar config
  avatar_skin: string
  avatar_hair: string
  avatar_style: 'short' | 'long' | 'curly' | 'bald'
  avatar_jersey: string
  avatar_number: string
  avatar_bg: string
  avatar_accessory: 'beard' | 'stubble' | ''
  
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  key: string
  label: string
  icon: string
  hint: string
  title: string
  subtitle: string
  sort_order: number
  active: boolean
}

export interface ActivityFeedItem {
  id: string
  icon: string
  text_html: string
  feed_type: 'new' | 'update' | 'hot' | 'trending'
  profile_slug?: string
  display_time: string
  sort_order: number
}

export interface LeaderboardItem {
  slug?: string
  name: string
  description: string
  value: string
  value_label: string
  color: 'gold' | 'green' | 'blue' | 'purple'
  badge?: 'verified' | 'record' | 'trending'
  growth?: string
  emoji?: string
}
