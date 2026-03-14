const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "you're not authenticated" });
  }

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.MY_SECRECT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "token is not valid" });
    }

    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
