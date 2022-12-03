const swaggerJsDocs = require("swagger-jsdoc");
import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
const router = Router();

const docs = swaggerJsDocs({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Micro serviço de Cursos",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.ts", "./routes/*.js"],
});

router.get(
  "/",
  (req, res, next) => {
    console.log("auth here");
    next();
  },
  swaggerUi.setup(docs)
);

export default router;
