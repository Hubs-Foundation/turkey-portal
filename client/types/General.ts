/**
 * General Types
 * Note: feel free to break-out into other files if you feel the need
 */

export type TierT = 'free' | 'premium'
export type StatusT = 'creating' | 'updating' | 'ready'

export type HubT = {
  ccu_limit: number
  hub_id: string
  name: string
  status: StatusT
  storage_limit_mb: number
  subdomain: string
  tier: TierT
}

export type AccountT = {
  displayName: string
  email: string
  profilePicture: string
  isInitialized?: boolean
  isLoggedIn?: boolean
}
