import express from "express";
import cors from "cors";
import pasteRoute from "./routes/pasteRoute.js";

const app = express();

app.use(
  cors({
    origin: ["https://pastebin-teal.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://pastebin-teal.vercel.app");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api", pasteRoute);

export default app;
