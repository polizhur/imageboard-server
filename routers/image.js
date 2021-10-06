const { Router } = require("express");

const image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  const images = await image.findAll();
  res.json(images);
});

module.exports = router;
