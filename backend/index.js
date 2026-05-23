import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import toolsRouter from './routes/tools.js'
import billingRouter from './routes/billing.js'
import usageRouter from './routes/usage.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
)

// Capture raw body for Paystack webhook HMAC verification
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)

app.use('/api/auth', authRouter)
app.use('/api/tools', toolsRouter)
app.use('/api/billing', billingRouter)
app.use('/api/usage', usageRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'kreva-ai-api' }))

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => console.log(`Kreva AI API running on port ${PORT}`))
