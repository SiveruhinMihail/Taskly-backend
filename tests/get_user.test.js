const axios = require('axios')
const { test, expect } = require('@jest/globals')

test('get_user', async () => {
  const getUser = await axios.get(`http://localhost:3000/api/auth/get_user`, {
    params: {
      email: 'userrrrr@example.com',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  expect(response.status).toBe(200)
})
