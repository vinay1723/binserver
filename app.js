import express from "express";
import cors from "cors";
import pasteRoute from "./routes/pasteRoute.js";

const app = express();

app.use(
  cors({
    origin: "https://pastebin-teal.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

app.use("/api", pasteRoute);

export default app;
