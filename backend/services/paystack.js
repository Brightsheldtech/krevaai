import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.PAYSTACK_SECRET_KEY
const BASE = 'https://api.paystack.co'

async function paystackRequest(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${SECRET}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  return res.json()
}

export function initializeTransaction({ email, amount, metadata }) {
  return paystackRequest('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({ email, amount: amount * 100, metadata }),
  })
}

export function verifyTransaction(reference) {
  return paystackRequest(`/transaction/verify/${reference}`)
}
