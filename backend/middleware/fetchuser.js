const jwt = require("jsonwebtoken");
const jwt_secret = "yohohooooo$$";

const fetchuser = (req, res, next) => {
  //getting user from jwt token
  const token = req.header("auth-token");
  if (!token) {
    ResizeObserverEntry.status(401).send({ error: "please authenticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate with a valid token" });
  }
};

module.exports = fetchuser;
