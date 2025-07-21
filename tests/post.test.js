const axios = require('axios')
const { test, expect } = require('@jest/globals')

test('Create post successfully', async () => {
  const response = await axios.post(
    `http://localhost:3000/api/route/create`,
    { title: 'Test post title' },
    { headers: { 'Content-Type': 'application/json' } },
  )

  expect(response.status).toBe(200)
})
