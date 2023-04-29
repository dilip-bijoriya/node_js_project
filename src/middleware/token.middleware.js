const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ error: "Unauthorize user" });
  try {
    const decode = jwt.verify(token, "secret");
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = verifyToken;
