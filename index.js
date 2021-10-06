const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`);
});
