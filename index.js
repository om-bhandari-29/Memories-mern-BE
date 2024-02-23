import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("API is running...");
});

app.use("/posts", postRoutes);
app.use("/user", userRouter);

const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const URL = process.env.MONGODB_URL;
const URL_WITH_USERNAME = URL.replace("<username>", USERNAME);
const MONGODB_URL = URL_WITH_USERNAME.replace("<password>", PASSWORD);
const PORT = process.env.PORT || 5000;

// const MONGODB_URL = 'mongodb+srv://omBhandari:0bs9lkABcrRZ2rxC@cluster0.ikvvtfe.mongodb.net/natours?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
