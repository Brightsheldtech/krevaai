import { supabase } from '../services/supabase.js'
import { PLAN_LIMITS, withinLimit } from './planLimits.js'

export async function trackUsage(userId, tool, tokensUsed) {
  const { error } = await supabase.from('usage').insert({
    user_id: userId,
    tool,
    tokens_used: tokensUsed,
  })
  if (error) throw error
}

export async function saveToolHistory(userId, tool, input, output) {
  const { error } = await supabase.from('tool_history').insert({
    user_id: userId,
    tool,
    input,
    output,
  })
  if (error) throw error
}

export async function checkUsageLimit(userId) {
  const { data: user } = await supabase
    .from('users')
    .select('plan')
    .eq('id', userId)
    .single()

  const plan = user?.plan ?? 'free'
  const { type, limit } = PLAN_LIMITS[plan]

  if (limit === Infinity) {
    return { allowed: true, plan, used: 0, limit }
  }

  const since = new Date()
  if (type === 'daily') {
    since.setHours(0, 0, 0, 0)
  } else {
    since.setDate(1)
    since.setHours(0, 0, 0, 0)
  }

  const { count } = await supabase
    .from('usage')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', since.toISOString())

  return {
    allowed: withinLimit(plan, count),
    plan,
    used: count,
    limit,
  }
}
