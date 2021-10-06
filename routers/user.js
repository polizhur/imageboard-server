const { Router } = require("express");

const user = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
  const users = await user.findAll();
  res.json(users);
});

module.exports = router;
