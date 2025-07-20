const axios = require('axios')
const { test, expect } = require('@jest/globals')

test('get_user', async () => {
  const response = await axios.get(`http://localhost:3000/api/auth/get_user`, {
    params: {
      email: 'userrrrr@example.com',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(response.data)
  expect(response.status).toBe(200)
  expect(response.data).toHaveProperty('success', true)
  expect(response.data.data).toMatchObject({
    email: 'userrrrr@example.com',
    name: expect.any(String),
  })
})
