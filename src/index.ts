import express from "express";

import { authRouter, subtitleRouter } from "./routes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import dotenv from "dotenv";
import { createConnection } from "typeorm";

dotenv.config();

createConnection()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log("Unable to connect to the database", e));

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};

const specs = swaggerJsdoc(options);

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/subtitle", subtitleRouter);
app.use("/auth", authRouter);

app.get("/", (_req, res) => res.send("Express + TypeScript Server: Test CD"));

app.use(
  "/explorer",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(PORT, () => {
  console.log(`⚡️[]: Server is running at http://localhost:${PORT}`);
});
