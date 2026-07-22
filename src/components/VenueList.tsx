import { useMemo, useState } from 'react'
import { Clock, MapPin, Navigation, Phone, StickyNote } from 'lucide-react'
import { VENUES, type Venue } from '@/data/venues'
import { compareVenues, getVenueState, type VenueStatus } from '@/lib/venue-status'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type Filter = 'all' | 'open' | 'later' | 'closed'

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'open', label: '营业中' },
  { key: 'later', label: '待开放' },
  { key: 'closed', label: '已打烊或休息' },
]

const BADGE_STYLE: Record<VenueStatus, string> = {
  open: 'bg-emerald-500 text-white border-transparent hover:bg-emerald-500',
  closing: 'bg-amber-500 text-white border-transparent hover:bg-amber-500',
  later: 'bg-sky-500 text-white border-transparent hover:bg-sky-500',
  closed: 'bg-zinc-200 text-zinc-600 border-transparent hover:bg-zinc-200',
  rest: 'bg-zinc-200 text-zinc-600 border-transparent hover:bg-zinc-200',
}

function matchFilter(status: VenueStatus, filter: Filter): boolean {
  if (filter === 'all') return true
  if (filter === 'open') return status === 'open' || status === 'closing'
  if (filter === 'later') return status === 'later'
  return status === 'closed' || status === 'rest'
}

function mapsUrl(venue: Venue): string {
  return `https://www.google.com/maps/search/${venue.mapQuery.replace(/\s+/g, '+')}+Chiang+Mai`
}

function VenueCard({ venue, now }: { venue: Venue; now: Date }) {
  const state = getVenueState(venue, now)
  return (
    <Card className={cn('transition-shadow hover:shadow-md', (state.status === 'closed' || state.status === 'rest') && 'opacity-80')}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-snug text-teal-950">{venue.name}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" className="border-teal-200 text-teal-700">
                {venue.category}
              </Badge>
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {venue.area}
              </span>
            </div>
          </div>
          <Badge className={cn('shrink-0', BADGE_STYLE[state.status])}>{state.badge}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="flex items-center gap-1.5 text-foreground/80">
          <Clock className="size-3.5 shrink-0 text-teal-600" />
          {venue.hoursText}
          <span className="text-xs text-muted-foreground">（{state.detail}）</span>
        </p>
        <p className="text-xs text-muted-foreground">古城区出发：{venue.transport}</p>
        {venue.note && (
          <p className="flex items-start gap-1.5 rounded-md bg-amber-50 px-2 py-1.5 text-xs leading-relaxed text-amber-800">
            <StickyNote className="mt-0.5 size-3.5 shrink-0" />
            {venue.note}
          </p>
        )}
        <div className="flex gap-2 pt-1">
          <Button asChild size="sm" className="bg-teal-700 hover:bg-teal-800">
            <a href={mapsUrl(venue)} target="_blank" rel="noreferrer">
              <Navigation className="size-3.5" />
              导航
            </a>
          </Button>
          {venue.phone && venue.phoneTel && (
            <Button asChild size="sm" variant="outline" className="border-teal-200 text-teal-700">
              <a href={`tel:${venue.phoneTel}`}>
                <Phone className="size-3.5" />
                电话 {venue.phone}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function VenueList({ now }: { now: Date }) {
  const [filter, setFilter] = useState<Filter>('all')

  const venues = useMemo(
    () =>
      [...VENUES]
        .filter((v) => matchFilter(getVenueState(v, now).status, filter))
        .sort((a, b) => compareVenues(a, b, now)),
    [now, filter],
  )

  const openCount = useMemo(
    () => VENUES.filter((v) => ['open', 'closing'].includes(getVenueState(v, now).status)).length,
    [now],
  )

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-2">
        <h2 className="text-lg font-bold text-teal-950">现在可以去</h2>
        <span className="text-sm text-muted-foreground">
          {openCount} 个场馆营业中 · 共 {VENUES.length} 个
        </span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={filter === f.key ? 'default' : 'outline'}
            className={cn(
              'rounded-full',
              filter === f.key
                ? 'bg-teal-700 hover:bg-teal-800'
                : 'border-teal-200 text-teal-700 hover:bg-teal-50',
            )}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      {venues.length === 0 ? (
        <p className="rounded-lg border border-dashed border-teal-200 p-6 text-center text-sm text-muted-foreground">
          此时刻没有符合筛选的场馆，换个筛选或时间试试。
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {venues.map((v) => (
            <VenueCard key={v.id} venue={v} now={now} />
          ))}
        </div>
      )}
    </section>
  )
}
