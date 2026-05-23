import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { supabase } from '../services/supabase.js'
import { PLAN_LIMITS } from '../utils/planLimits.js'

const router = Router()

router.use(requireAuth)

router.get('/me', async (req, res) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', req.user.id)
      .single()

    const plan = user?.plan ?? 'free'
    const { type, limit } = PLAN_LIMITS[plan]

    const since = new Date()
    if (type === 'daily') {
      since.setHours(0, 0, 0, 0)
    } else {
      since.setDate(1)
      since.setHours(0, 0, 0, 0)
    }

    const { data, error } = await supabase
      .from('usage')
      .select('tokens_used, tool, created_at')
      .eq('user_id', req.user.id)
      .gte('created_at', since.toISOString())

    if (error) throw error

    const requestCount = data.length
    const totalTokens = data.reduce((sum, row) => sum + row.tokens_used, 0)

    res.json({ plan, requestCount, totalTokens, limit, since, type })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/limits', async (req, res) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', req.user.id)
      .single()

    const plan = user?.plan ?? 'free'
    res.json({ plan, ...PLAN_LIMITS[plan] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
