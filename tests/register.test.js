const axios = require('axios')
const { test, expect } = require('@jest/globals')

test('Register user', async () => {
  const response = await axios.post(
    `http://localhost:3000/api/auth/register`,
    {
      name: 'Weah MeahoBe',
      email: 'userrrrrr@example.com',
      password: 'Password123!',
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )

  expect(response.status).toBe(200)
})
