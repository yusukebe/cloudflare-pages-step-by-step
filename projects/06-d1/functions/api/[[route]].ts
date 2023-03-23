import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { handle } from 'hono/cloudflare-pages'
import { D1Database } from '@cloudflare/workers-types'

type Bindings = {
  DB: D1Database
}

type Post = {
  id: number
  body: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app
  .get('/posts', prettyJSON(), async (c) => {
    const body = new Date().toString()
    // CREATE
    await c.env.DB.prepare('INSERT INTO posts(body) VALUES (?);').bind(body).run()
    // READ
    const { results } = await c.env.DB.prepare('SELECT * FROM posts;').all<Post>()
    const posts = results || []
    return c.json({
      message: 'Hello D1!',
      posts,
    })
  })
  .get('/truncate', async (c) => {
    await c.env.DB.prepare('DELETE FROM posts;').run()
    return c.json({
      message: 'Truncated!',
    })
  })

export const onRequest = handle(app)
