import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type VenueFilter = 'all' | 'open' | 'later' | 'closed'

const FILTERS: { key: VenueFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'open', label: '营业中' },
  { key: 'later', label: '待开放' },
  { key: 'closed', label: '已打烊或休息' },
]

interface Props {
  filter: VenueFilter
  onChange: (f: VenueFilter) => void
  openCount: number
  total: number
}

/** 吸顶状态筛选栏：直接置于页头下方，滚动时常驻 */
export function FilterBar({ filter, onChange, openCount, total }: Props) {
  return (
    <div className="sticky top-0 z-40 border-b border-teal-900/10 bg-[hsl(45,33%,97%)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-teal-900">
          现在可以去
        </span>
        <span className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
          {openCount} 个营业中 / 共 {total} 个
        </span>
        <div className="ml-auto flex shrink-0 gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.key}
              size="sm"
              variant={filter === f.key ? 'default' : 'outline'}
              className={cn(
                'shrink-0 rounded-full whitespace-nowrap',
                filter === f.key
                  ? 'bg-teal-700 hover:bg-teal-800'
                  : 'border-teal-200 bg-white/70 text-teal-700 hover:bg-teal-50',
              )}
              onClick={() => onChange(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
