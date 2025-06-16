const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');
const tokenKey = process.env.ACCESS_TOKEN_KEY;
const refreshKey = process.env.REFRESH_TOKEN_KEY;

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, tokenKey),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, refreshKey),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, refreshKey);

      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
