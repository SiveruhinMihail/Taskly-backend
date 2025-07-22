const axios = require('axios')

const get_token = async () => {
  const token = await axios.post(
    `http://localhost:3000/api/auth/login`,
    {
      email: 'userrrrr@example.com',
      password: 'Password123!',
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return token.data.data.accessToken
}

module.exports = get_token
