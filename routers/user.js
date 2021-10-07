const { Router } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    //const { email, password, fullName } = req.body;
    if (!email || email === "") {
      res.status(400).send("Must provide an email address");
    } else if (!fullName || fullName === "") {
      res.status(400).send("Must provide a full name");
    } else if (!password || password === "") {
      res.status(400).send("Must provide a password");
    } else {
      const user = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
