import * as swaggerJsDocs from "swagger-jsdoc";
import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
const router = Router();

const docs = swaggerJsDocs({
  swaggerDefinition: {
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./*.ts", "./*.js"],
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
