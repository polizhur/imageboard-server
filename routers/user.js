const { Router } = require("express");

const User = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
