const AuthService = require("../services/auth.service");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, userId } = await AuthService.login(
      email,
      password
    );
    res.json({ accessToken, refreshToken, userId });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken, refreshToken: newRefreshToken } =
      await AuthService.refreshTokens(refreshToken);
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await AuthService.logout(req.userId);
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
