require('dotenv').config()
const axios = require('axios')
const { test, expect } = require('@jest/globals')

const PORT = process.env.PORT

test('Register user', async () => {
  const response = await axios.post(
    `http://localhost:${PORT}/api/auth/register`,
    {
      name: 'Weah MeahoBe',
      email: 'userrrrr@example.com',
      password: 'Password123!',
      use: '33dasdsa33',
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )

  expect(response.status).toBe(201)
})
