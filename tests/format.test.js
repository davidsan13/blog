import { describe, expect, it } from 'vitest'
import { excerpt, formatDate, readingTime, sanitizeHtml, sortByNewest, toPlainText } from '../src/lib/format'

describe('format helpers', () => {
  it('formats dates and tolerates bad input', () => {
    expect(formatDate('2024-03-05T12:00:00Z')).toBe('Mar 5, 2024')
    expect(formatDate(undefined)).toBe('')
  })

  it('decodes entity-encoded HTML into plain text', () => {
    expect(toPlainText('&lt;p&gt;Hello &amp;amp; welcome&lt;/p&gt;')).toBe('Hello & welcome')
  })

  it('truncates excerpts on a word boundary', () => {
    const text = 'word '.repeat(60)
    const result = excerpt(text, 20)
    expect(result.endsWith('…')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(21)
    expect(excerpt('short', 20)).toBe('short')
  })

  it('removes scripts and event handlers from post HTML (XSS)', () => {
    const dirty = '&lt;p onclick="x()"&gt;Hi&lt;/p&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;img src=x onerror=alert(1)&gt;'
    const clean = sanitizeHtml(dirty)
    expect(clean).toContain('<p>Hi</p>')
    expect(clean).not.toMatch(/script|onclick|onerror/i)
  })

  it('estimates reading time with a one-minute floor', () => {
    expect(readingTime('a few words')).toBe(1)
    expect(readingTime('word '.repeat(450))).toBe(3)
  })

  it('sorts newest first without mutating the input', () => {
    const input = [{ publishedAt: '2024-01-01' }, { publishedAt: '2024-06-01' }]
    expect(sortByNewest(input)[0].publishedAt).toBe('2024-06-01')
    expect(input[0].publishedAt).toBe('2024-01-01')
  })
})
