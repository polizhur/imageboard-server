const { Router } = require("express");

const Image = require("../models").image;
const { toData, toJWT } = require("../auth/jwt");

const router = new Router();

router.get("/auth/messy", async (req, res, next) => {
  console.log(req);
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
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
