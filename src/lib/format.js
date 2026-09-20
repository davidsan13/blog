import { decode } from 'html-entities'
import DOMPurify from 'dompurify'

// Open user-supplied links safely.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target')) {
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : dateFormat.format(date)
}

/** Post bodies are stored HTML-entity encoded; decode, then strip anything dangerous (XSS). */
export function sanitizeHtml(raw = '') {
  return DOMPurify.sanitize(decode(raw), { USE_PROFILES: { html: true } })
}

export function toPlainText(raw = '') {
  const clean = DOMPurify.sanitize(decode(raw), { ALLOWED_TAGS: [] })
  const text = new DOMParser().parseFromString(clean, 'text/html').body.textContent ?? ''
  return text.replace(/\s+/g, ' ').trim()
}

export function excerpt(raw, max = 140) {
  const text = toPlainText(raw)
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : max)}…`
}

export function readingTime(raw, wordsPerMinute = 200) {
  const text = toPlainText(raw)
  const words = text ? text.split(' ').length : 0
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

/** Newest first; posts without a date keep their relative order at the end. */
export function sortByNewest(posts = []) {
  return [...posts].sort((a, b) => new Date(b.publishedAt ?? 0) - new Date(a.publishedAt ?? 0))
}
