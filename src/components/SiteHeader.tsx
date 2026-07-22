import { CalendarDays, Hourglass, PartyPopper, Plane } from 'lucide-react'
import { formatClock, weekdayLabel, type TripPhase } from '@/lib/cnx-time'
import { Badge } from '@/components/ui/badge'

interface Props {
  now: Date
  phase: TripPhase
  previewing: boolean
}

export function SiteHeader({ now, phase, previewing }: Props) {
  const dateText = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日 · ${weekdayLabel(now)}`

  return (
    <header className="bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 text-white">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-10 sm:pt-10">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">清迈现在去哪</h1>
          {phase.kind === 'before' && (
            <Badge className="border-transparent bg-amber-400 text-amber-950 hover:bg-amber-400">
              <Hourglass className="size-3" />
              距出发还有 {phase.daysLeft} 天
            </Badge>
          )}
          {phase.kind === 'during' && (
            <Badge className="border-transparent bg-amber-400 text-amber-950 hover:bg-amber-400">
              <Plane className="size-3" />
              行程第 {phase.day} 天 · {weekdayLabel(now)}
            </Badge>
          )}
          {phase.kind === 'after' && (
            <Badge className="border-transparent bg-white/20 text-white hover:bg-white/20">
              <PartyPopper className="size-3" />
              行程已结束 · 场馆仍可浏览
            </Badge>
          )}
          {previewing && (
            <Badge variant="outline" className="border-amber-300 text-amber-200">
              预览模式
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-teal-100/90">时间感知的清迈旅行助手 · 2026/9/28–10/4</p>

        <div className="mt-6 flex items-end gap-3">
          <div className="font-mono text-5xl font-semibold tracking-wider tabular-nums sm:text-6xl">
            {formatClock(now)}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-teal-100">
          <CalendarDays className="size-4" />
          <span>清迈当地时间（UTC+7） · {dateText}</span>
        </div>
      </div>
    </header>
  )
}
