/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
            res.status(401).json({ you: "can't touch this" });
          } else {
            req.decodedJwt = decodedToken;
            console.log(req.decodedJwt);
            next();
          }
        });
      } else {
        throw new Error("invalid auth data");
      }
    } else {
      throw new Error("token not found");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
