const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
const { notsRouter } = require("./routes/nots.routes");
const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", notsRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to database");
    console.log(`server is listening on port ${process.env.PORT}`);
  } catch (err) {
    console.log("Error");
    console.log(err);
  }
});
