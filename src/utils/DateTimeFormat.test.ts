import { parseDE7ToDateTime } from './DateTimeFormat'
import { formatDistanceToNow } from 'date-fns'

jest.mock('date-fns-tz', () => ({
  ...jest.requireActual('date-fns-tz'),
  toZonedTime: jest.fn(date => date),
}))

describe('parseDE7ToDateTime', () => {
  const originalYear = new Date().getFullYear()
  const mockNow = new Date(originalYear, 0, 1, 12, 0, 0)

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(mockNow)
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('returns current time for invalid DE7 length', () => {
    const result = parseDE7ToDateTime('invalid')
    expect(result.date).toBe(`${originalYear}-01-01`)
    expect(result.time).toBe('12:00:00')
    expect(result.distanceToNow).toBe('just now')
  })

  test('validates and parses valid DE7 string', () => {
    const de7 = '1231235959' // MM=12, DD=31, hh=23, mm=59, ss=59
    const result = parseDE7ToDateTime(de7)

    const parsedDate = new Date(originalYear, 11, 31, 23, 59, 59)
    const expectedDistanceToNow = formatDistanceToNow(parsedDate, { addSuffix: true })

    expect(result.date).toBe(`${originalYear}-12-31`)
    expect(result.time).toBe('23:59:59')
    expect(result.distanceToNow).toBe(expectedDistanceToNow)
  })

  test('handles invalid month', () => {
    const result = parseDE7ToDateTime('1301000000') // MM=13
    expect(console.warn).toHaveBeenCalledWith('Invalid DE7 format:', '1301000000')
    expect(result.distanceToNow).toBe('just now')
  })

  test('handles invalid day (February 30)', () => {
    const result = parseDE7ToDateTime('0230000000') // DD=30
    expect(console.warn).toHaveBeenCalled()
  })

  test('handles leap year February 29', () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 1, 29))
    const result = parseDE7ToDateTime('0229000000')
    expect(result.date).toBe('2024-02-29')
  })

  const testCases = [
    {
      de7: '0101000000', // January 1, 00:00:00
      expectedDate: `${originalYear}-01-01`,
      expectedTime: '00:00:00',
      getExpectedDistanceToNow: (year: number) =>
        formatDistanceToNow(new Date(year, 0, 1, 0, 0, 0), { addSuffix: true }),
    },
    {
      de7: '1231235959', // December 31, 23:59:59
      expectedDate: `${originalYear}-12-31`,
      expectedTime: '23:59:59',
      getExpectedDistanceToNow: (year: number) =>
        formatDistanceToNow(new Date(year, 11, 31, 23, 59, 59), { addSuffix: true }),
    },
    {
      de7: '0615103045', // June 15, 10:30:45
      expectedDate: `${originalYear}-06-15`,
      expectedTime: '10:30:45',
      getExpectedDistanceToNow: (year: number) =>
        formatDistanceToNow(new Date(year, 5, 15, 10, 30, 45), { addSuffix: true }),
    },
  ]

  test.each(testCases)(
    'parses DE7 string %s',
    ({ de7, expectedDate, expectedTime, getExpectedDistanceToNow }) => {
      const result = parseDE7ToDateTime(de7)
      expect(console.warn).not.toHaveBeenCalled()
      expect(result.date).toBe(expectedDate)
      expect(result.time).toBe(expectedTime)
      expect(result.distanceToNow).toBe(getExpectedDistanceToNow(originalYear))
    }
  )

  test.each(Array.from({ length: 20 }, (_, i) => i))('parses random valid DE7 string #%d', () => {
    const randomMonth = Math.floor(Math.random() * 12) + 1
    const randomDay = Math.floor(Math.random() * 28) + 1
    const randomHour = Math.floor(Math.random() * 24)
    const randomMinute = Math.floor(Math.random() * 60)
    const randomSecond = Math.floor(Math.random() * 60)

    const padded = (n: number) => n.toString().padStart(2, '0')
    const de7 = `${padded(randomMonth)}${padded(randomDay)}${padded(randomHour)}${padded(randomMinute)}${padded(randomSecond)}`

    const result = parseDE7ToDateTime(de7)

    const expectedDate = `${originalYear}-${padded(randomMonth)}-${padded(randomDay)}`
    const expectedTime = `${padded(randomHour)}:${padded(randomMinute)}:${padded(randomSecond)}`

    const parsedDate = new Date(
      originalYear,
      randomMonth - 1,
      randomDay,
      randomHour,
      randomMinute,
      randomSecond
    )
    const expectedDistanceToNow = formatDistanceToNow(parsedDate, { addSuffix: true })

    expect(console.warn).not.toHaveBeenCalled()
    expect(result.date).toBe(expectedDate)
    expect(result.time).toBe(expectedTime)
    expect(result.distanceToNow).toBe(expectedDistanceToNow)
  })
})

