const serverless = require("serverless-http");
const express = require("express");
import userRouter from "./routes/user";
import docsRouter from "./routes/docs";
import * as swaggerUi from "swagger-ui-express";

const Router = express.Router;

const app = express();
app.use(express.json());
const baseRoute = Router();
/**
 * @swagger
 * tags:
 *   - name: Courses
 *     description: Endpoints referentes a curso
 */
app.use("/course", baseRoute);
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints referentes a usuário
 */
baseRoute.use("/user", userRouter);

baseRoute.use("/docs", docsRouter);
baseRoute.use(swaggerUi.serve);
exports.handler = serverless(app);
if (process.env.NODE_ENV == "local")
  app.listen(8080, () => console.log(`Listening on: 8080`));
