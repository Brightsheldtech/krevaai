import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { callClaude } from '../services/claude.js'
import { supabase } from '../services/supabase.js'
import { checkUsageLimit, trackUsage, saveToolHistory } from '../utils/trackUsage.js'

const router = Router()

router.use(requireAuth)

// History endpoints — defined before /:slug to avoid routing conflicts
router.get('/history', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('tool_history')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/history/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('tool_history')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)

    if (error) throw error
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Tool execution — individual tool prompts are added as each tool is built
router.post('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const { input } = req.body

    const limit = await checkUsageLimit(req.user.id)
    if (!limit.allowed) {
      return res.status(429).json({
        message: `You have reached your ${limit.plan === 'free' ? 'daily' : 'monthly'} request limit`,
        limit,
      })
    }

    const toolConfig = getToolConfig(slug)
    if (!toolConfig) {
      return res.status(404).json({ message: `Tool "${slug}" not found` })
    }

    const { systemPrompt, buildUserMessage, maxTokens } = toolConfig
    const userMessage = buildUserMessage(input)

    const { text, totalTokens } = await callClaude({ systemPrompt, userMessage, maxTokens })

    await Promise.all([
      trackUsage(req.user.id, slug, totalTokens),
      saveToolHistory(req.user.id, slug, input, text),
    ])

    res.json({ output: text, tokensUsed: totalTokens })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

// Tool configurations are imported and registered here as each tool is built
function getToolConfig(slug) {
  // Populated tool by tool during build
  const tools = {}
  return tools[slug] ?? null
}

export default router
