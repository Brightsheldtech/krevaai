import { Router } from 'express'
import crypto from 'crypto'
import { requireAuth } from '../middleware/auth.js'
import { initializeTransaction, verifyTransaction } from '../services/paystack.js'
import { supabase } from '../services/supabase.js'

const router = Router()

const PLAN_AMOUNTS = {
  starter: 3500,
  pro: 8000,
}

router.post('/init', requireAuth, async (req, res) => {
  try {
    const { plan } = req.body
    if (!PLAN_AMOUNTS[plan]) {
      return res.status(400).json({ message: 'Invalid plan selected' })
    }

    const result = await initializeTransaction({
      email: req.user.email,
      amount: PLAN_AMOUNTS[plan],
      metadata: { user_id: req.user.id, plan },
    })

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/verify/:ref', requireAuth, async (req, res) => {
  try {
    const result = await verifyTransaction(req.params.ref)

    if (result.data?.status === 'success') {
      const { plan } = result.data.metadata
      const renewsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

      await supabase.from('subscriptions').upsert(
        {
          user_id: req.user.id,
          plan,
          paystack_ref: req.params.ref,
          status: 'active',
          renews_at: renewsAt,
        },
        { onConflict: 'user_id' }
      )

      await supabase.from('users').update({ plan }).eq('id', req.user.id)
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/webhook', async (req, res) => {
  const signature = req.headers['x-paystack-signature']
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest('hex')

  if (hash !== signature) {
    return res.status(401).send('Invalid signature')
  }

  const { event, data } = req.body

  if (event === 'charge.success') {
    const { user_id, plan } = data.metadata ?? {}
    if (user_id && plan) {
      await supabase.from('users').update({ plan }).eq('id', user_id)
    }
  }

  if (event === 'subscription.disable') {
    const userId = data.metadata?.user_id
    if (userId) {
      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('user_id', userId)
      await supabase.from('users').update({ plan: 'free' }).eq('id', userId)
    }
  }

  res.sendStatus(200)
})

router.get('/status', requireAuth, async (req, res) => {
  try {
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'active')
      .maybeSingle()

    res.json(data ?? { plan: 'free', status: 'active' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
