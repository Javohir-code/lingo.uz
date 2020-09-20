const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  const token = req.header("x-auth-token");

  if (!token)
    return res
      .status(401)
      .send("Token bo'lmaganligi sababli murojaat rad etildi");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Yaroqsiz token");
  }
};

// const jwt = require("jsonwebtoken");
// const config = require("config");

// module.exports = (req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }

//   try {
//     const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

//     if (!token) {
//       return res.status(401).json({ message: "Нет авторизации" });
//     }

//     const decoded = jwt.verify(token, config.get("jwtSecret"));
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(401).json({ message: "Нет авторизации" });
//   }
// };
