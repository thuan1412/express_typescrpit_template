import express from "express";
import { subtitleRouter } from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use("/subtitle", subtitleRouter);

const PORT = process.env.PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Dubbing",
        url: "https://123.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};

const specs = swaggerJsdoc(options);

app.get("/", (req, res) => res.send("Express + TypeScript Server: Test CD"));
app.use(
  "/explorer",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(PORT, () => {
  console.log(`⚡️[]: Server is running at http://localhost:${PORT}`);
});
