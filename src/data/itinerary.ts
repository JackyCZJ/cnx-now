// 每日行程数据（2026-09-28 ~ 10-04，泰国当地日期）
export interface PlanItem {
  period: string
  text: string
}

export interface PlanOption {
  label: string
  title: string
  items: PlanItem[]
}

export interface DayPlan {
  day: number
  /** 如 "9/28 · 周一" */
  dateLabel: string
  title: string
  /** 单方案时的安排 */
  items?: PlanItem[]
  /** 多方案（如 Day 4 三选一、Day 5 二选一） */
  options?: PlanOption[]
  /** 多方案之外的共同安排（如 Day 5 晚上看比赛） */
  shared?: PlanItem[]
}

export const DAY_PLANS: DayPlan[] = [
  {
    day: 1,
    dateLabel: '9/28 · 周一',
    title: '抵达日 · 古城初印象',
    items: [
      { period: '下午', text: '约 13:00–13:40 落地清迈，入境后 Grab 进城办入住' },
      { period: '下午', text: '塔佩门 → 草编街 → 古城寺庙群散步' },
      { period: '晚上', text: '长康路夜市晚餐 + 逛摊' },
    ],
  },
  {
    day: 2,
    dateLabel: '9/29 · 周二',
    title: '瀑布与艺术村',
    items: [
      { period: '上午', text: '粘粘瀑布 Bua Thong（备换洗衣物、防滑鞋）' },
      { period: '下午', text: 'Baan Kang Wat 艺术村喝咖啡、逛手作小店' },
      { period: '晚上', text: '二选一：清迈大学前门夜市（学生物价）/ 夜间动物园' },
    ],
  },
  {
    day: 3,
    dateLabel: '9/30 · 周三',
    title: '丛林飞跃 + 射击',
    items: [
      { period: '上午', text: '丛林飞跃（已订上午场，8:00–8:30 酒店接人）' },
      { period: '下午', text: 'Shooting Club 射击（湄林，需提前 2 小时预订）' },
      { period: '晚上', text: '宁曼路晚餐 + 商圈散步' },
    ],
  },
  {
    day: 4,
    dateLabel: '10/1 · 周四',
    title: '三选一 · 深度体验日',
    options: [
      {
        label: 'A',
        title: '烹饪课 + 泰拳课',
        items: [
          { period: '上午', text: '奶奶厨房烹饪课' },
          { period: '傍晚', text: 'Thaphae Muay Thai Gym 泰拳体验课' },
        ],
      },
      {
        label: 'B',
        title: '素贴山 + 陆冲',
        items: [
          { period: '上午', text: '双龙寺（素贴山）→ 帕拉寺' },
          { period: '下午', text: '下山顺路 Club Carving CNX 陆冲' },
          { period: '晚上', text: 'MAYA 晚餐' },
        ],
      },
      {
        label: 'C',
        title: '清莱三庙一日游',
        items: [
          { period: '全天', text: '白庙 / 蓝庙 / 黑屋（早出晚归一日游）' },
        ],
      },
    ],
  },
  {
    day: 5,
    dateLabel: '10/2 · 周五',
    title: '二选一 + 泰拳之夜',
    options: [
      {
        label: 'A',
        title: '因他农山一日游',
        items: [
          { period: '全天', text: '泰国最高峰，山上 12–18°C，记得带外套' },
        ],
      },
      {
        label: 'B',
        title: '泰拳课 + 古城寺庙',
        items: [
          { period: '上午', text: 'Thaphae Muay Thai Gym 泰拳体验课' },
          { period: '下午', text: '古城寺庙群慢逛' },
        ],
      },
    ],
    shared: [{ period: '晚上', text: '21:00 塔佩拳击场看泰拳比赛（两方案共同安排）' }],
  },
  {
    day: 6,
    dateLabel: '10/3 · 周六',
    title: '市集采购 + 夜卧铺',
    items: [
      { period: '上午', text: 'JJ Market 周末市集（建议 9 点前到）' },
      { period: '下午', text: 'Big C 手信采购（顺路 Decathlon）' },
      { period: '晚上', text: '17:00 前到清迈火车站，约 18:00–18:20 乘 10 次特快夜卧铺赴曼谷' },
    ],
  },
  {
    day: 7,
    dateLabel: '10/4 · 周日',
    title: '曼谷中转 · 返程',
    items: [
      { period: '清晨', text: '约 06:30 抵曼谷 Krung Thep Aphiwat 站，寄存行李' },
      { period: '上午', text: '暹罗商圈（商场 10:00 开门，先去四面佛 / 早餐）' },
      { period: '中午', text: '11:30–12:30 抵达素万那普机场' },
      { period: '下午', text: '14:50 UO735 起飞，18:50 抵香港' },
    ],
  },
]
