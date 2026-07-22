// 清迈时间工具：始终以 Asia/Bangkok（UTC+7）计算“清迈当前时间”
export const TZ = 'Asia/Bangkok'
export const TRIP_START = '2026-09-28'
export const TRIP_DAYS = 7

export function pad(n: number) {
  return String(n).padStart(2, '0')
}

/**
 * 返回一个 Date，其“本地字段”（getHours/getDay 等）代表曼谷墙钟时间。
 * 只应使用其本地年月日时分秒与星期字段，不要用它做绝对时间戳运算。
 */
export function bangkokNow(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }))
}

export function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function weekdayLabel(d: Date): string {
  return WEEKDAYS[d.getDay()]
}

/** 行程第 dayIndex 天（1–7）在 minutes 时刻的墙钟 Date */
export function makeTripDate(dayIndex: number, minutes: number): Date {
  const d = new Date(2026, 8, 28) // 2026-09-28（本地字段即曼谷日期）
  d.setDate(d.getDate() + (dayIndex - 1))
  d.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  return d
}

export function tripDateLabel(dayIndex: number): string {
  const d = makeTripDate(dayIndex, 0)
  return `${d.getMonth() + 1}/${d.getDate()} ${weekdayLabel(d)}`
}

export type TripPhase =
  | { kind: 'before'; daysLeft: number }
  | { kind: 'during'; day: number }
  | { kind: 'after' }

/** 根据真实清迈时间计算行程阶段 */
export function tripPhase(now: Date): TripPhase {
  const start = new Date(2026, 8, 28)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.round((today.getTime() - start.getTime()) / 86400000)
  if (diff < 0) return { kind: 'before', daysLeft: -diff }
  if (diff >= TRIP_DAYS) return { kind: 'after' }
  return { kind: 'during', day: diff + 1 }
}

export function formatClock(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function formatMinutes(m: number): string {
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
}
