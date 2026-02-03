import express from "express";
import cors from "cors";
import pasteRoute from "./routes/pasteRoute.js";

const app = express();

app.use(cors({ origin: "" }));
app.use(express.json());

app.use("/api", pasteRoute);

export default app;
