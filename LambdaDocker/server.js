const { Sequelize, UUID, UUIDV4 } = require("sequelize");
const { resolve } = require("path");
const serverless = require("serverless-http");
const express = require("express");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { BOOLEAN } = require("sequelize");
const fs = require("fs/promises");
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "Micro-service-1", job: "log-job" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: "/mnt/efs/logs/teste-grafana.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "/mnt/efs/logs/teste-grafana-combined.log",
    }),
  ],
});
const app = express();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/**
 * @type {Sequelize}
 */
let connection;
/**
 * Returns All models from application
 * @returns {{ connection, User:import("sequelize") }}
 */
function buildCache() {
  if (!connection) {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: resolve("../", "mnt", "efs", "data", "database.db"),
      logging: false,
    });
    connection = sequelize;
    const User = connection.define("users", {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      insertBool: BOOLEAN,
    });
    // await sequelize.sync({ alter: true });
    console.log("**INFO", "Creating new connection");
    return { connection, User };
  }

  const User = connection.define("users", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    insertBool: BOOLEAN,
  });
  console.log("**INFO", "Using existing Connection");
  // await connection.sync({ alter: true });

  return { connection, User };
}
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
    if (Math.random() > 0.5) {
      logger.info({ message: "info" });
      return res.json({ info: "infoLog" });
    } else {
      logger.error({ message: "An error has ocurred" });
      return res.json({ info: "errorLog" });
    }
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
