// TODO 用户等级常量
export const USER_RATE_CONST = [
  { key: '成交已到期', value: 'S2' },
  { key: '成交未到期', value: 'S1' },
  { key: '待成交', value: 'A' },
  { key: '意向客户', value: 'B' },
  { key: '无意向', value: 'C' },
]
// TODO 到期时间常量
export const DATE_CONST = [
  { key: '一天', value: 24 * 60 * 60 },
  { key: "三天", value: 3 * 24 * 60 * 60 },
  { key: "七天", value: 7 * 24 * 60 * 60 },
]
// 业务报表统计类型常量
export const REPORT_DATE_TYPE = [
  { key: '本年', value: 'year' },
  { key: "本月", value: 'month' },
  { key: "本周", value: 'week' },
  { key: "本日", value: 'today' },
]