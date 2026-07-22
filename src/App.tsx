import { useEffect, useMemo, useState } from 'react'
import { bangkokNow, makeTripDate, tripPhase } from '@/lib/cnx-time'
import { SiteHeader } from '@/components/SiteHeader'
import { PreviewBar, type Preview } from '@/components/PreviewBar'
import { TodayPlan } from '@/components/TodayPlan'
import { VenueList } from '@/components/VenueList'
import { FooterInfo } from '@/components/FooterInfo'

export default function App() {
  // 真实清迈时间（每秒刷新）
  const [now, setNow] = useState<Date>(() => bangkokNow())
  useEffect(() => {
    const t = setInterval(() => setNow(bangkokNow()), 1000)
    return () => clearInterval(t)
  }, [])

  // 预览模式：null = 跟随真实时间
  const [preview, setPreview] = useState<Preview | null>(null)

  const phase = tripPhase(now)

  const effective = useMemo(
    () => (preview ? makeTripDate(preview.day, preview.minutes) : now),
    [preview, now],
  )

  const displayDay =
    preview?.day ??
    (phase.kind === 'during' ? phase.day : phase.kind === 'before' ? 1 : 7)

  const handlePreviewDay = (day: number) => {
    const current = preview ?? {
      day,
      minutes: now.getHours() * 60 + now.getMinutes(),
    }
    // 以 30 分钟为步长取整
    const minutes =
      day === current.day
        ? current.minutes
        : Math.min(23.5 * 60, Math.round((now.getHours() * 60 + now.getMinutes()) / 30) * 30)
    setPreview({ day, minutes })
  }

  return (
    <div className="min-h-screen bg-[hsl(45,33%,97%)]">
      <SiteHeader now={now} phase={phase} previewing={preview !== null} />
      <main className="mx-auto -mt-5 max-w-5xl space-y-8 px-4 pb-16">
        <PreviewBar
          preview={preview}
          onPreviewDay={handlePreviewDay}
          onPreviewMinutes={(minutes) =>
            setPreview((p) => (p ? { ...p, minutes } : p))
          }
          onReset={() => setPreview(null)}
        />
        <TodayPlan day={displayDay} />
        <VenueList now={effective} />
        <FooterInfo />
      </main>
    </div>
  )
}
