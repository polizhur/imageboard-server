const { Router } = require("express");

const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  const images = await Image.findAll();
  res.json(images);
});

router.post("/", async (req, res, next) => {
  try {
    const url = req.body.url;
    const title = req.body.title;
    if (!url || url === "") {
      res.status(400).send("Must provide an url address");
    } else {
      const image = await Image.create({ url, title });
      res.json(image);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
