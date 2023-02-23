import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const app = new Hono()

app.get('/hello', (c) =>
  c.json({
    message: 'Hello Hono!',
  })
)

export const onRequest = handle(app, '/api')
