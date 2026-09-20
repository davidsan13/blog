// Thin wrapper around fetch so every component talks to the API the same way.
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3005').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request(path, { method = 'GET', body, signal } = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      signal,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('Could not reach the server. Please try again.')
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new ApiError(data?.message ?? `Request failed (${res.status})`, res.status)
  }
  return data
}

const enc = encodeURIComponent

export const api = {
  getLatest: async (opts) => (await request('/blog', opts)) ?? [],
  getPosts: async (opts) => (await request('/blog/allBlogs', opts)) ?? [],
  // Resolves to { blog, comments }; 404 for unknown ids and drafts
  getPost: (id, opts) => request(`/blog/${enc(id)}`, opts),
  addComment: (id, { user, message }) =>
    request(`/blog/${enc(id)}/comment`, { method: 'POST', body: { user, message } }),
  // Public profile of the blog owner; null when no admin exists yet
  getAuthor: async (opts) => {
    try {
      return await request('/blog/author', opts)
    } catch (err) {
      if (err.status === 404) return null
      throw err
    }
  },
}
