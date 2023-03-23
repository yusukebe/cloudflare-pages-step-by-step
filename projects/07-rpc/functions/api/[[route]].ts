import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono().basePath('/api')

const schema = z.object({
  name: z.string(),
})

const route = app.get('/hello', zValidator('query', schema), (c) => {
  const { name } = c.req.valid('query')
  return c.jsonT({
    message: `Hello ${name}!`,
  })
})

export type AppType = typeof route

export const onRequest = handle(app)
