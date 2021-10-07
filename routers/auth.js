const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(password);
    if (!email || email === "") {
      res.status(400).send("Please supply a valid email");
    } else if (!password || password === "") {
      res.status(400).send("Please supply a valid password");
    } else {
      // 1. find user based on email address
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).send("User with that email does not exist");
      }
      // 2. use bcrypt.compareSync to check
      //the password against the stored hash
      console.log(password);
      console.log(user.password);
      if (bcrypt.compareSync(password, user.password)) {
        // 3. if the password is correct,
        //return a JWT with the userId of the user (user.id)
        const jwt = toJWT({ userId: user.id });
        res.send({
          jwt,
        });
      } else {
        res.status(400).send("Password was incorrect");
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
