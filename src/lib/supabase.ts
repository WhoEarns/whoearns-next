import { createClient } from '@supabase/supabase-js'
import type { Profile, Category, ActivityFeedItem } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── PROFILES ──────────────────────────────────────────────

export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('rank_order', { ascending: true })

  if (error) {
    console.error('Error fetching profiles:', error)
    return []
  }
  return data || []
}

export async function getProfileBySlug(slug: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function getProfilesByCategory(category: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('category', category)
    .order('rank_order', { ascending: true })

  if (error) return []
  return data || []
}

export async function getProfilesByCountry(country: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('country', country)
    .order('rank_order', { ascending: true })

  if (error) return []
  return data || []
}

export async function searchProfiles(query: string): Promise<Partial<Profile>[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, slug, name, category, country, stats, meta, net_worth, avatar_skin, avatar_hair, avatar_style, avatar_jersey, avatar_number, avatar_bg, avatar_accessory')
    .ilike('name', `%${query}%`)
    .limit(8)

  if (error) return []
  return data || []
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('slug')

  if (error) return []
  return (data || []).map(p => p.slug)
}

// ── CATEGORIES ────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) return []
  return data || []
}

// ── ACTIVITY FEED ─────────────────────────────────────────

export async function getActivityFeed(): Promise<ActivityFeedItem[]> {
  const { data, error } = await supabase
    .from('activity_feed')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })
    .limit(8)

  if (error) return []
  return data || []
}

// ── EMAIL ALERTS ──────────────────────────────────────────

export async function subscribeToProfile(email: string, profileSlug: string, profileName: string) {
  const { error } = await supabase
    .from('email_alerts')
    .upsert({ email, profile_slug: profileSlug, profile_name: profileName })

  return !error
}

// ── DATA SUBMISSIONS ──────────────────────────────────────

export async function submitDataCorrection(data: {
  profile_slug: string
  profile_name: string
  field_name: string
  current_value: string
  suggested_value: string
  source_url: string
  submitter_email?: string
}) {
  const { error } = await supabase
    .from('data_submissions')
    .insert(data)

  return !error
}

// ── LEADERBOARD ───────────────────────────────────────────

export async function getLeaderboard(category: string): Promise<Partial<Profile>[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('slug, name, category, country, stats, meta, growth, rank_order, avatar_skin, avatar_hair, avatar_style, avatar_jersey, avatar_number, avatar_bg, avatar_accessory')
    .eq('category', category)
    .order('rank_order', { ascending: true })
    .limit(10)

  if (error) return []
  return data || []
}
