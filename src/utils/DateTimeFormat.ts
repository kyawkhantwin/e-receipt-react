import { formatDistanceToNow } from 'date-fns'

export function parseDE7ToDateTime(de7: string): {
  date: string
  time: string
  distanceToNow: string
} {
  const padded = (n: number) => n.toString().padStart(2, '0')
  const now = new Date()
  const year = now.getFullYear()

  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate()

  if (!de7 || de7.length !== 10) {
    return {
      date: `${year}-${padded(now.getMonth() + 1)}-${padded(now.getDate())}`,
      time: `${padded(now.getHours())}:${padded(now.getMinutes())}:${padded(now.getSeconds())}`,
      distanceToNow: 'just now',
    }
  }

  const MM = parseInt(de7.slice(0, 2), 10)
  const DD = parseInt(de7.slice(2, 4), 10)
  const hh = parseInt(de7.slice(4, 6), 10)
  const mm = parseInt(de7.slice(6, 8), 10)
  const ss = parseInt(de7.slice(8, 10), 10)

  const isValid =
    MM >= 1 &&
    MM <= 12 &&
    DD >= 1 &&
    DD <= daysInMonth(MM, year) &&
    hh >= 0 &&
    hh <= 23 &&
    mm >= 0 &&
    mm <= 59 &&
    ss >= 0 &&
    ss <= 59

  if (!isValid) {
    console.warn('Invalid DE7 format:', de7)

    return {
      date: `${year}-${padded(now.getMonth() + 1)}-${padded(now.getDate())}`,
      time: `${padded(now.getHours())}:${padded(now.getMinutes())}:${padded(now.getSeconds())}`,
      distanceToNow: 'just now',
    }
  }

  const parsedDate = new Date(
    `${year}-${padded(MM)}-${padded(DD)}T${padded(hh)}:${padded(mm)}:${padded(ss)}`
  )
  const date = `${year}-${padded(MM)}-${padded(DD)}`
  const time = `${padded(hh)}:${padded(mm)}:${padded(ss)}`
  const distanceToNow = formatDistanceToNow(parsedDate, { addSuffix: true })

  return { date, time, distanceToNow }
}
