const db = require("./api-helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const restricted = require("./authenticate-middleware");

router.post("/register", restricted, (req, res) => {
  // implement registration
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 8);
  creds.password = hash;
  db.addUser(creds)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(500).json({ message: "Can't add user" });
    });
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;
  db.findBy({ username })
    .then((user) => {
      if (user && bcjs.compareSync(password, user.password)) {
        let token = generateToken(user);
        res.status(200).json({ message: `welcome ${username}`, token });
      } else {
        res.status(401).json({ message: "Wrong credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error logging in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, "whatever", options);
}

module.exports = router;
