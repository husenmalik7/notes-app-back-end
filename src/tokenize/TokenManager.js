const Jwt = require('@hapi/jwt');
const tokenKey = process.env.ACCESS_TOKEN_KEY;

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, tokenKey),
};

module.exports = TokenManager;
