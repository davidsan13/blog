import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../src/router'

const posts = [
  { _id: 'a1', title: 'Learning React Router', content: '&lt;p&gt;Data routers are great.&lt;/p&gt;', publishedAt: '2024-05-01T00:00:00Z', published: true },
  { _id: 'b2', title: 'Cloud basics', content: '&lt;p&gt;Notes about AWS.&lt;/p&gt;', publishedAt: '2024-06-01T00:00:00Z', published: true },
]
const comments = [{ _id: 'c1', user: 'Sam', message: 'Tom &amp; Jerry', createdTime: '2024-06-02T00:00:00Z' }]

function mockApi(handler) {
  globalThis.fetch = vi.fn(async (url, init = {}) => {
    const { status = 200, body } = (await handler(new URL(url).pathname, init)) ?? { status: 404, body: {} }
    return { ok: status < 400, status, json: async () => body }
  })
}

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

beforeEach(() => {
  window.scrollTo = vi.fn()
  mockApi((path, init) => {
    if (path === '/blog/author') return { body: { username: 'sam', displayName: 'Sam Rivera', tagline: 'Writing about testing', github: 'https://github.com/sam', linkedin: '' } }
    if (path === '/blog') return { body: [posts[1], posts[0]] }
    if (path === '/blog/allBlogs') return { body: posts }
    if (path === '/blog/b2' && init.method === 'GET') return { body: { blog: posts[1], comments } }
    if (path === '/blog/b2/comment') return { body: { message: 'success' } }
    if (path === '/blog/missing') return { body: { blog: null, comments: [] } }
  })
})
afterEach(() => vi.restoreAllMocks())

describe('blog app', () => {
  it('shows the newest posts first on the home page', async () => {
    renderAt('/')
    const links = await screen.findAllByRole('link', { name: /Cloud basics|Learning React Router/ })
    expect(links[0]).toHaveTextContent('Cloud basics')
  })

  it('filters posts with the search box', async () => {
    renderAt('/blog/allBlogs')
    await screen.findByText('Cloud basics')
    await userEvent.type(screen.getByRole('searchbox'), 'router')
    expect(screen.queryByText('Cloud basics')).not.toBeInTheDocument()
    expect(screen.getByText('Learning React Router')).toBeInTheDocument()
  })

  it('shows a retryable error when the API is down', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError('offline'))
    renderAt('/blog/allBlogs')
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not reach the server/i)
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('loads a post by URL (deep link) with its comments', async () => {
    renderAt('/blog/b2')
    expect(await screen.findByRole('heading', { level: 1, name: 'Cloud basics' })).toBeInTheDocument()
    expect(screen.getByText('Tom & Jerry')).toBeInTheDocument()
  })

  it('handles unknown posts', async () => {
    renderAt('/blog/missing')
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not be found/i)
  })

  it('validates and submits a comment', async () => {
    renderAt('/blog/b2')
    await screen.findByText('Tom & Jerry')
    await userEvent.click(screen.getByRole('button', { name: /add comment/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/add a name and a comment/i)

    await userEvent.type(screen.getByLabelText('Name'), 'Dana')
    await userEvent.type(screen.getByLabelText('Comment'), 'Great read')
    await userEvent.click(screen.getByRole('button', { name: /add comment/i }))

    await waitFor(() => {
      const call = globalThis.fetch.mock.calls.find(([u]) => u.endsWith('/blog/b2/comment'))
      expect(JSON.parse(call[1].body)).toEqual({ user: 'Dana', message: 'Great read' })
    })
  })

  it('renders a 404 page for unknown routes', async () => {
    renderAt('/nope')
    expect(await screen.findByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })
})

describe('home page', () => {
  it('shows the hardcoded greeting and tagline', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { level: 1, name: /Hi, I.m David/ })).toBeInTheDocument()
    expect(screen.getByText('Notes on software, cloud, and learning in public.')).toBeInTheDocument()
  })

  it('still shows the author-driven footer links from the API', async () => {
    renderAt('/')
    expect(await screen.findByRole('link', { name: /Sam Rivera on GitHub/ })).toHaveAttribute('href', 'https://github.com/sam')
    expect(screen.queryByLabelText(/LinkedIn/)).not.toBeInTheDocument() // empty links are hidden
  })
})
