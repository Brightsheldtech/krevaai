export const PLAN_LIMITS = {
  free: { type: 'daily', limit: 5 },
  starter: { type: 'monthly', limit: 200 },
  pro: { type: 'monthly', limit: Infinity },
}

export function withinLimit(plan, count) {
  const { limit } = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free
  return limit === Infinity || count < limit
}
