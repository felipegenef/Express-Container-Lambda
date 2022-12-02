import { AppDataSource } from "./data-source";
const serverless = require("serverless-http");
const express = require("express");
import userRouter from "./routes/user";
import docsRouter from "./routes/docs";
import * as swaggerUi from "swagger-ui-express";

const Router = express.Router;

const app = express();
app.use(express.json());
const baseRoute = Router();
app.use("/course", baseRoute);
baseRoute.get("/create", async (req, res) => {
  try {
    res.send("salvo");
  } catch (error) {
    res.send(error);
  }
});
baseRoute.get("/get", async (req, res) => {
  res.send({ data: "" });
});
baseRoute.use("/user", userRouter);
baseRoute.use("/docs", docsRouter);
baseRoute.use(swaggerUi.serve);
exports.handler = serverless(app);
if (process.env.NODE_ENV == "local")
  app.listen(8080, () => console.log(`Listening on: 8080`));
