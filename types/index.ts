export interface User {
  id: string
  email: string
  stripe_customer_id?: string
  subscription_status: 'trial' | 'active' | 'past_due' | 'canceled' | 'free'
  plan: 'free' | 'single' | 'multi' | 'enterprise'
  created_at: string
  last_login?: string
}

export interface Location {
  id: string
  user_id: string
  name: string
  address?: string
  type: string
  business_type?: string
  timezone: string
  is_active: boolean
  created_at: string
}

export interface Zone {
  id: string
  location_id: string
  name: string
  sort_order: number
  checklist_items: string[]
  is_active: boolean
  created_at: string
}

export interface ConditionItem {
  item: string
  severity: 'normal' | 'attention' | 'urgent'
  is_preexisting: boolean
  notes: string
}

export interface DamageItem {
  description: string
  severity: 'minor' | 'moderate' | 'severe'
  location_within_zone: string
  date_discovered?: string
  status?: 'open' | 'in_progress' | 'resolved'
  resolution_date?: string
  resolution_note?: string
  photos?: string[]
}

export interface MaintenanceItem {
  description: string
  priority: 'low' | 'medium' | 'high'
}

export interface ZoneData {
  zone_id: string
  zone_name: string
  overall_rating: 'good' | 'fair' | 'poor'
  summary: string
  condition_items: ConditionItem[]
  new_damage: DamageItem[]
  maintenance_items: MaintenanceItem[]
  photos: string[]
  voice_transcript?: string
  completed_at: string
}

export interface Report {
  id: string
  location_id: string
  user_id: string
  report_type: 'opening' | 'closing' | 'incident' | 'inspection'
  status: 'draft' | 'submitted' | 'reviewed'
  shift_date: string
  started_at: string
  completed_at?: string
  zone_data: Record<string, ZoneData>
  photos: string[]
  ai_summary?: string
  damage_flagged: boolean
  damage_details: DamageItem[]
  overall_score?: number
  metadata: Record<string, unknown>
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: string
  current_period_start: string
  current_period_end: string
  cancel_at?: string
  created_at: string
  updated_at: string
}
