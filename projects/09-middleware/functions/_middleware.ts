import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { EventContext, handle } from 'hono/cloudflare-pages'

type Bindings = {
  eventContext: EventContext
}

const app = new Hono<{ Bindings: Bindings }>()

app.get(
  '*',
  basicAuth({
    username: 'foo',
    password: 'bar',
  }),
  async (c) => {
    return c.env.eventContext.next()
  }
)

export const onRequest = handle(app)
