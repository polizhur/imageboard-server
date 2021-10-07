const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || email === "") {
      res.status(400).send("Please supply a valid email");
    } else if (!password || password === "") {
      res.status(400).send("Please supply a valid password");
    } else {
      res.send({
        jwt: toJWT({ userId: 1 }),
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
