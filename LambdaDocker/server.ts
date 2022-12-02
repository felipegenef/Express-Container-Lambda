import * as serverless from "serverless-http";
import * as express from "express";
import userRouter from "./routes/user";
import docsRouter from "./routes/docs";
import * as swaggerUi from "swagger-ui-express";

import { PrismaClient } from "@prisma/client";
const Router = express.Router;
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const baseRoute = Router();
app.use("/course", baseRoute);
baseRoute.get("/create", async (req, res) => {
  try {
    await prisma.user.create({
      data: { email: "email" + new Date(), name: "nome" },
    });
    res.send("salvo");
  } catch (error) {
    res.send(error);
  }
});
baseRoute.get("/get", async (req, res) => {
  const data = await prisma.user.findMany();
  res.send({ data });
});
baseRoute.use("/user", userRouter);
baseRoute.use("/docs", docsRouter);
baseRoute.use(swaggerUi.serve);
exports.handler = serverless(app);
if (process.env.NODE_ENV == "local")
  app.listen(8080, () => console.log(`Listening on: 8080`));
