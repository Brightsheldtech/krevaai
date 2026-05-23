import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv'

dotenv.config()

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function callClaude({ systemPrompt, userMessage, maxTokens = 1500 }) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  const text = response.content[0].text
  const inputTokens = response.usage.input_tokens
  const outputTokens = response.usage.output_tokens

  return { text, inputTokens, outputTokens, totalTokens: inputTokens + outputTokens }
}
