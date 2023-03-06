const express = require('express');

const app = express();
const PORT = 3000;
const db = require("./db");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/posts");


app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => console.log("starting server..."));
