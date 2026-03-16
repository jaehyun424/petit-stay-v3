/** Full date: "2024년 3월 15일" */
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Short date: "3월 15일" */
export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

/** Time slice: "18:00" */
export function formatTime(timeStr: string | null | undefined): string {
  return timeStr?.slice(0, 5) ?? ''
}

/** Currency: "₩30,000" */
export function formatWon(amount: number): string {
  return `₩${amount.toLocaleString()}`
}
