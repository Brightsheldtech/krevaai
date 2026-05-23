import { supabase } from './supabase.js'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const token = session?.access_token

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `Request failed with status ${res.status}`)
  }

  return res.json()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}
