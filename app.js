import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pasteRoute from "./routes/pasteRoute.js";

const app = express();

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("Database connected successfully");
});

app.use(
  cors({
    origin: "https://pastebin-teal.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", pasteRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

export default app;
