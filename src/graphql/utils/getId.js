const jwt = require("jsonwebtoken");

const getUserId = (req, requireAuth = true) => {
  const header = req.headers.authorization;

  if (header) {
    try {
      const token = header.split(" ")[1]; //split or u can use replace('Bearer', '')
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded.id;
    } catch (e) {
      if (Error(e).message == "JsonWebTokenError: invalid signature") {
        const refreshToken = header.split(" ")[1]; //split or u can use replace('Bearer', '')
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.SECRET_KEY_REFRESH,
        );
        return decodedRefreshToken.id;
      }
    }
  }
  if (requireAuth) {
    throw new Error("Authentication required!");
  }

  return null;
};

module.exports = getUserId;
