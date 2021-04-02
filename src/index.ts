import express from "express";
import typeorm from "typeorm";
import { subtitleRouter } from "./routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use("/subtitle", subtitleRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Express + TypeScript Server: Test CD"));
app.listen(PORT, () => {
  console.log(`⚡️[]: Server is running at http://localhost:${PORT}`);
});
