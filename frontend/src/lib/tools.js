import {
  PenLine,
  Lightbulb,
  Globe,
  Palette,
  MessageSquare,
  FileText,
  BarChart2,
  Sparkles,
} from 'lucide-react'

export const TOOLS = [
  {
    slug: 'content-writer',
    name: 'Content Writer',
    description: 'Generate marketing copy, social posts, and email campaigns for Nigerian businesses.',
    icon: PenLine,
    maxTokens: 1500,
  },
  {
    slug: 'business-coach',
    name: 'AI Business Coach',
    description: 'Get strategic advice grounded in Nigerian market realities.',
    icon: Lightbulb,
    maxTokens: 2500,
  },
  {
    slug: 'website-brief',
    name: 'Website Builder Brief',
    description: 'Generate a complete website structure brief your developer can build from.',
    icon: Globe,
    maxTokens: 2500,
  },
  {
    slug: 'logo-concept',
    name: 'Logo Concept Generator',
    description: 'Get three distinct logo concept directions with ready-to-use AI image prompts.',
    icon: Palette,
    maxTokens: 1500,
  },
  {
    slug: 'customer-reply',
    name: 'Customer Reply Assistant',
    description: 'Draft professional, human replies to customer messages and complaints.',
    icon: MessageSquare,
    maxTokens: 1500,
  },
  {
    slug: 'invoice-maker',
    name: 'Invoice and Quote Maker',
    description: 'Generate formatted professional invoices and quotes in naira.',
    icon: FileText,
    maxTokens: 1500,
  },
  {
    slug: 'caption-scorer',
    name: 'Caption Scorer',
    description: 'Score your social media caption and get a noticeably improved rewrite.',
    icon: BarChart2,
    maxTokens: 1500,
  },
  {
    slug: 'idea-brainstorm',
    name: 'Idea Brainstorm',
    description: 'Generate ten grounded business, product, or content ideas for your niche.',
    icon: Sparkles,
    maxTokens: 1500,
  },
]

export function getToolBySlug(slug) {
  return TOOLS.find((t) => t.slug === slug) ?? null
}
