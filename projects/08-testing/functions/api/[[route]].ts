import app from '../../server'
import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'

const api = new Hono()
api.route('/api', app)

export const onRequest = handle(api)
