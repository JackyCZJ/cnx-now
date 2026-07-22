import { Banknote, Car, Info, Luggage } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TIPS = [
  { icon: Info, text: '泰国时间比香港晚 1 小时，本页时钟已固定为清迈当地时间。' },
  { icon: Car, text: '市内交通以 Grab 为主，郊区景点建议提前叫好回程车。' },
  { icon: Banknote, text: '市集、夜市多收现金，建议人均备 ฿1,000–1,500/天。' },
  { icon: Luggage, text: '液体手信（精油、酱料等）需托运，手提上机会被没收。' },
]

export function FooterInfo() {
  return (
    <section>
      <Card className="border-teal-200/70 bg-teal-50/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-teal-900">实用信息</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-teal-950/85">
                <tip.icon className="mt-0.5 size-4 shrink-0 text-teal-600" />
                {tip.text}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        清迈现在去哪 · 营业时间为参考值，出行前建议再电话或 Google Maps 确认
      </p>
    </section>
  )
}
