
/**
 * General Types
 * Note: feel free to break-out into other files if you feel the need
 */


export type HubT = {
  ccu_limit: number,
  hub_id: string,
  name: string,
  status: string,
  storage_limit_mb: number,
  subdomain: string,
  tier: string
}

export type AccountT = {
  displayName:string,
  email:string,
  profilePic: string
}
