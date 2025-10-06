const axios = require('axios')
const { test } = require('@jest/globals')

test('get_user', async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/auth/get_user`, {
      params: {
        email: 'userrrrr@example.com',
      },
    })
    // Если запрос успешен
    console.log(response.data)
  } catch (error) {
    // Обрабатываем ошибку
    if (error.response) {
      // Сервер ответил с кодом ошибки (4xx/5xx)
      console.log('Status:', error.response.status)
      console.log('Error message:', error.response.data) // ← Вот ваше сообщение об ошибке
      console.log('Details:', error.response.data?.data?.detail) // ← Детали ошибки
      console.log('Details:', error.response.data.config) // ← Детали ошибки
    } else {
      // Ошибка настройки запроса или сети
      console.log('Error:', error.message)
    }
    throw error // Пробрасываем ошибку дальше для fail теста
  }
})
