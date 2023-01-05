const swaggerJsDocs = require("swagger-jsdoc");
import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
const router = Router();
// Tipos de parameters :
/**
 *   /users/{userId}:
 *  get:
 *     summary: Get a user by ID
 *    parameters:
 *     - in: path | header | query | cookie
 */
const docs = swaggerJsDocs({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Micro serviço de Livros",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.ts", "./routes/*.js", "../server.ts", "../server.js"],
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
