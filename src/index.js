require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const userRoute = require("./routes/user.route");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);

app.get("/", async (req, res) => {
  res.send("New Backend for Mock_13");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Listening on http://localhost:${PORT}`);
});
