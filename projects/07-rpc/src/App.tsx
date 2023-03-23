import { useState, useEffect } from 'react'
import { hc } from 'hono/client'
import { AppType } from '../functions/api/[[route]]'

const client = hc<AppType>('/')

const App = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await client.api.hello.$get({
        query: {
          name: 'RPC',
        },
      })
      const data = await res.json()
      setMessage(data.message)
    }
    fetchData()
  }, [])

  return <h1>{message}</h1>
}

export default App
