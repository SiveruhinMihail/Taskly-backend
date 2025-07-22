const axios = require('axios')
const { test, expect } = require('@jest/globals')
const get_token = require('./utils/authHelper')

test('auth/me', async () => {
  const token = await get_token()
  const response = await axios.get(`http://localhost:3000/api/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.data)
  expect(response.status).toBe(200)
})
