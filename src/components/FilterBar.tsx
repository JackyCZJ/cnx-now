import { VENUE_GROUPS, type VenueGroupId } from '@/data/venues'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type VenueFilter = 'all' | 'open' | 'later' | 'closed'
export type GroupFilter = 'all' | VenueGroupId

const FILTERS: { key: VenueFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'open', label: '营业中' },
  { key: 'later', label: '待开放' },
  { key: 'closed', label: '已打烊或休息' },
]

interface Props {
  filter: VenueFilter
  onFilterChange: (f: VenueFilter) => void
  groupFilter: GroupFilter
  onGroupFilterChange: (g: GroupFilter) => void
  openCount: number
  total: number
}

const chipRow =
  'flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

function chipClass(active: boolean) {
  return cn(
    'shrink-0 rounded-full whitespace-nowrap',
    active
      ? 'bg-teal-700 hover:bg-teal-800'
      : 'border-teal-200 bg-white/70 text-teal-700 hover:bg-teal-50',
  )
}

/** 吸顶筛选栏：第一行状态筛选，第二行场所类型筛选，滚动时常驻 */
export function FilterBar({
  filter,
  onFilterChange,
  groupFilter,
  onGroupFilterChange,
  openCount,
  total,
}: Props) {
  const groupMeta =
    groupFilter === 'all' ? null : VENUE_GROUPS.find((g) => g.id === groupFilter)

  return (
    <div className="sticky top-0 z-40 border-b border-teal-900/10 bg-[hsl(45,33%,97%)]/95 backdrop-blur">
      <div className="mx-auto max-w-5xl space-y-2 px-4 py-2.5">
        {/* 第一行：计数 + 状态筛选 */}
        <div className={chipRow}>
          <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-teal-900">
            现在可以去
          </span>
          <span className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
            {openCount} 个营业中 / 共 {total} 个
            {groupMeta && ` · 仅看${groupMeta.label}`}
          </span>
          <div className="ml-auto flex shrink-0 gap-2">
            {FILTERS.map((f) => (
              <Button
                key={f.key}
                size="sm"
                variant={filter === f.key ? 'default' : 'outline'}
                className={chipClass(filter === f.key)}
                onClick={() => onFilterChange(f.key)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 第二行：场所类型筛选 */}
        <div className={chipRow}>
          <Button
            size="sm"
            variant={groupFilter === 'all' ? 'default' : 'outline'}
            className={chipClass(groupFilter === 'all')}
            onClick={() => onGroupFilterChange('all')}
          >
            全部类型
          </Button>
          {VENUE_GROUPS.map((g) => (
            <Button
              key={g.id}
              size="sm"
              variant={groupFilter === g.id ? 'default' : 'outline'}
              className={chipClass(groupFilter === g.id)}
              onClick={() => onGroupFilterChange(g.id)}
            >
              {g.emoji} {g.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
