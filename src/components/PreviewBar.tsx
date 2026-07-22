import { RotateCcw } from 'lucide-react'
import { formatMinutes, tripDateLabel, TRIP_DAYS } from '@/lib/cnx-time'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface Preview {
  day: number
  minutes: number
}

interface Props {
  preview: Preview | null
  onPreviewDay: (day: number) => void
  onPreviewMinutes: (minutes: number) => void
  onReset: () => void
}

const QUICK_TIMES = [
  { label: '早晨 08:00', minutes: 8 * 60 },
  { label: '中午 12:00', minutes: 12 * 60 },
  { label: '下午 15:00', minutes: 15 * 60 },
  { label: '傍晚 18:00', minutes: 18 * 60 },
  { label: '夜晚 21:00', minutes: 21 * 60 },
]

export function PreviewBar({ preview, onPreviewDay, onPreviewMinutes, onReset }: Props) {
  return (
    <Card className="border-teal-200/70">
      <CardContent className="space-y-3 pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-teal-900">预览某天</span>
          <Select
            value={preview ? String(preview.day) : ''}
            onValueChange={(v) => onPreviewDay(Number(v))}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="选择行程日…" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: TRIP_DAYS }, (_, i) => i + 1).map((d) => (
                <SelectItem key={d} value={String(d)}>
                  Day {d} · {tripDateLabel(d)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {preview && (
            <Button
              variant="ghost"
              size="sm"
              className="text-teal-700"
              onClick={onReset}
            >
              <RotateCcw className="size-4" />
              跟随实时
            </Button>
          )}
        </div>

        {preview && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Slider
                className="flex-1"
                min={0}
                max={23.5 * 60}
                step={30}
                value={[preview.minutes]}
                onValueChange={([v]) => onPreviewMinutes(v)}
              />
              <span className="w-14 text-right font-mono text-sm font-semibold text-teal-800 tabular-nums">
                {formatMinutes(preview.minutes)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_TIMES.map((t) => (
                <Button
                  key={t.minutes}
                  variant={preview.minutes === t.minutes ? 'default' : 'outline'}
                  size="sm"
                  className={
                    preview.minutes === t.minutes
                      ? 'bg-teal-700 hover:bg-teal-800'
                      : 'border-teal-200 text-teal-700'
                  }
                  onClick={() => onPreviewMinutes(t.minutes)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              正在模拟 Day {preview.day}（{tripDateLabel(preview.day)}）的场馆状态与行程，点「跟随实时」返回真实时间。
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
