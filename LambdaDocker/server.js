const { Sequelize, UUID, UUIDV4 } = require("sequelize");
const { resolve } = require("path");
const serverless = require("serverless-http");
const express = require("express");
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
  });
  console.log("**INFO", "Using existing Connection");
  // await connection.sync({ alter: true });

  return { connection, User };
}

app.get("/api/info", async (req, res) => {
  try {
    res.send({ body: req });
  } catch (error) {
    res.send({ error });
  }
});
app.get("/api/v1/create", async (req, res) => {
  try {
    const { User } = buildCache();
    // await User.create({});
    for (let index = 0; index < 40; index++) {
      await User.create({});
    }
    // const data = await User.findAll();
    res.status(202).send({ data: "finished" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});
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
module.exports.handler = serverless(app);
