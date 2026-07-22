import type { Venue } from '@/data/venues'

export type VenueStatus = 'open' | 'closing' | 'later' | 'closed' | 'rest'

export interface VenueState {
  status: VenueStatus
  /** 徽标文字 */
  badge: string
  /** 状态补充说明（打烊/开门时间） */
  detail: string
  openMin?: number
  closeMin?: number
}

function toMin(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** 根据曼谷墙钟时间计算场馆当日状态 */
export function getVenueState(venue: Venue, now: Date): VenueState {
  const rule = venue.rules.find((r) => r.days.includes(now.getDay()))
  if (!rule) {
    return { status: 'rest', badge: '今日休息', detail: '今天不营业' }
  }
  const openMin = toMin(rule.open)
  const closeMin = toMin(rule.close)
  const m = now.getHours() * 60 + now.getMinutes()
  const closeText = rule.close === '24:00' ? '00:00' : rule.close
  if (m < openMin) {
    return { status: 'later', badge: '今日待开放', detail: `${rule.open} 开门`, openMin, closeMin }
  }
  if (m >= closeMin) {
    return { status: 'closed', badge: '已打烊', detail: '今日营业时间已过', openMin, closeMin }
  }
  if (closeMin - m <= 60) {
    return { status: 'closing', badge: '即将打烊', detail: `${closeText} 打烊`, openMin, closeMin }
  }
  return { status: 'open', badge: '营业中', detail: `${closeText} 打烊`, openMin, closeMin }
}

const STATUS_RANK: Record<VenueStatus, number> = {
  open: 0,
  closing: 0,
  later: 1,
  closed: 2,
  rest: 2,
}

/** 营业中（打烊近的在前）→ 待开放（开门近的在前）→ 已打烊/休息 */
export function compareVenues(a: Venue, b: Venue, now: Date): number {
  const sa = getVenueState(a, now)
  const sb = getVenueState(b, now)
  const ra = STATUS_RANK[sa.status]
  const rb = STATUS_RANK[sb.status]
  if (ra !== rb) return ra - rb
  if (ra === 0) return (sa.closeMin ?? 0) - (sb.closeMin ?? 0)
  if (ra === 1) return (sa.openMin ?? 0) - (sb.openMin ?? 0)
  return a.name.localeCompare(b.name, 'zh-Hans-CN')
}
