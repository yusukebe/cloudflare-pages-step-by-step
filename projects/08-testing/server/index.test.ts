import app from './index'

describe('Basic', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('/hello')
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      message: 'Hello Hono!',
    })
  })
})
