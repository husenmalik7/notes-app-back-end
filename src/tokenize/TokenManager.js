const Jwt = require('@hapi/jwt');
const tokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshKey = process.env.REFRESH_TOKEN_KEY;

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, tokenKey),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, refreshKey),
};

module.exports = TokenManager;
