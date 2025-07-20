test('Create post successfully', async () => {
  const response = await axios.post(
    `http://localhost:3000/posts`,
    { title: 'Test post title' },
    { headers: { 'Content-Type': 'application/json' } },
  )

  expect(response.status).toBe(201)
  expect(response.data).toEqual({
    success: true,
    message: 'Post created successfully',
    data: expect.objectContaining({
      title: 'Test post title',
      _id: expect.any(String),
    }),
  })
})
