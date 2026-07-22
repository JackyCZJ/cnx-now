import { Sun, Moon, Sunrise, Sunset, Clock3 } from 'lucide-react'
import { DAY_PLANS, type PlanItem } from '@/data/itinerary'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const PERIOD_ICON: Record<string, typeof Sun> = {
  清晨: Sunrise,
  上午: Sun,
  中午: Sun,
  下午: Sunset,
  傍晚: Sunset,
  晚上: Moon,
  全天: Clock3,
}

function PlanItems({ items }: { items: PlanItem[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => {
        const Icon = PERIOD_ICON[item.period] ?? Clock3
        return (
          <li key={i} className="flex items-start gap-3">
            <Badge
              variant="outline"
              className="mt-0.5 shrink-0 border-teal-200 bg-teal-50 text-teal-800"
            >
              <Icon className="size-3" />
              {item.period}
            </Badge>
            <span className="text-sm leading-relaxed text-foreground/90">{item.text}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function TodayPlan({ day }: { day: number }) {
  const plan = DAY_PLANS.find((p) => p.day === day) ?? DAY_PLANS[0]

  return (
    <section>
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="text-lg font-bold text-teal-950">今日行程</h2>
        <span className="text-sm text-muted-foreground">
          Day {plan.day} · {plan.dateLabel}
        </span>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-teal-900">{plan.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {plan.items && <PlanItems items={plan.items} />}

          {plan.options && (
            <Tabs defaultValue={plan.options[0].label}>
              <TabsList className="w-full sm:w-auto">
                {plan.options.map((opt) => (
                  <TabsTrigger key={opt.label} value={opt.label} className="flex-1 sm:flex-none">
                    方案 {opt.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {plan.options.map((opt) => (
                <TabsContent key={opt.label} value={opt.label} className="space-y-3 pt-2">
                  <p className="text-sm font-medium text-amber-700">
                    方案 {opt.label} · {opt.title}
                  </p>
                  <PlanItems items={opt.items} />
                </TabsContent>
              ))}
            </Tabs>
          )}

          {plan.shared && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <PlanItems items={plan.shared} />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
