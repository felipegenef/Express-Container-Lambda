const serverless = require("serverless-http");
const express = require("express");
import { Request, Response } from "express";
const Router = express.Router;

const app = express();
app.use(express.json());
const MS = ["book", "course"];
const baseRoute = Router();

app.use("/docs", baseRoute);
baseRoute.get("/apis", (req: Request, res: Response) => {
  res.send(
    MS.reduce((prev, next) => {
      return (
        prev + `\n<br/>\n<a href="/${next}/docs" target="_blank">${next}</a>`
      );
    }, "<h1>Micro Serviços e suas documentações</h1>")
  );
});

exports.handler = serverless(app);
if (process.env.NODE_ENV == "local")
  app.listen(8080, () => console.log(`Listening on: 8080`));
