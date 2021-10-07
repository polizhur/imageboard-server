const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const jsonParser = express.json();

app.use(jsonParser);

const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

app.use("/users", userRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening on :${PORT}`);
});
