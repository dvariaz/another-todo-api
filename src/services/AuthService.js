const jwt = require("jsonwebtoken");

class _AuthService {
  signAccessToken(user) {
    return jwt.sign(
      {
        sub: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_LIFE }
    );
  }

  signRefreshToken(user) {
    const refreshToken = jwt.sign(
      {
        sub: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_LIFE }
    );

    return refreshToken;
  }

  signTokens(user) {
    const accessToken = this.signAccessToken(user);
    const refreshToken = this.signRefreshToken(user);

    return { accessToken, refreshToken };
  }

  verifyAccessToken(accessToken) {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    return payload;
  }

  verifyRefreshToken(refreshToken) {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    return payload;
  }
}

module.exports = new _AuthService();
