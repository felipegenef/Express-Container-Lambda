const serverless = require("serverless-http");
const express = require("express");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require("./logger");
const buildCache = require("./db");
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @swagger
 * /api/info:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/api/info", async (req, res) => {
  try {
    const random = Math.random();
    let body;
    if (random < 0.1) {
      body = { httpMethod: "GET", status: 200 };
      logger.info(body);
      return res.json(body);
    }
    if (random < 0.2) {
      body = { httpMethod: "PATCH", status: 500 };
      logger.info(body);
      return res.json(body);
    }
    if (random < 0.3) {
      body = { httpMethod: "GET", status: 500 };
      logger.error(body);
      return res.json(body);
    }
    if (random < 0.4) {
      body = { httpMethod: "PATCH", status: 404 };
      logger.info(body);
      return res.json(body);
    }
    if (random < 0.5) {
      body = { httpMethod: "GET", status: 302 };
      logger.info(body);
      return res.json(body);
    }
    if (random < 0.6) {
      body = { httpMethod: "POST", status: 202 };
      logger.info(body);
      return res.json(body);
    }
    if (random < 0.7) {
      body = { httpMethod: "PATCH", status: 400 };
      logger.warn(body);
      return res.json(body);
    }
    if (random < 0.8) {
      body = { httpMethod: "DELETE", status: 200 };
      logger.warn(body);
      return res.json(body);
    }
    if (random < 0.9) {
      body = { httpMethod: "PUT", status: 500 };
      logger.error(body);
      return res.json(body);
    }

    body = { httpMethod: "PUT", status: 404 };
    logger.warn(body);
    return res.json(body);
  } catch (error) {
    res.send({ error });
  }
});
/**
 * @swagger
 * /api/v1/create:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/api/v1/create", async (req, res) => {
  try {
    const { User } = buildCache();
    // await User.create({});

    const data = await User.findAll();
    res.status(202).send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, data });
  }
});
/**
 * @swagger
 * /api/v1/create2:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/api/v1/create2", async (req, res) => {
  try {
    const { User } = buildCache();
    // await User.create({});
    const promisses = [];
    for (let index = 0; index < 40; index++) {
      promisses.push(User.create({}));
    }
    const data = await Promise.all(promisses);
    // const data = await User.findAll();
    console.log(data);
    res.status(202).send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});
// DOCS
const docs = swaggerJsDocs({
  swaggerDefinition: {
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["server.js", "./src/routes*.js"], // files containing annotations as above
});
app.use(swaggerUi.serve);
app.get(
  "/docs",
  (req, res, next) => {
    console.log("auth here");
    next();
  },

  swaggerUi.setup(docs)
);
module.exports.handler = serverless(app);
// app.listen(8080, () => console.log(`Listening on: 3000`));
