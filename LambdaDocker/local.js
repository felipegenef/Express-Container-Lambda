const { Sequelize, UUID, UUIDV4 } = require("sequelize");
const { resolve } = require("path");
const serverless = require("serverless-http");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/**
 * Returns All models from application
 * @returns {{ connection, User:import("sequelize") }}
 */
async function buildCache() {
  if (!global.connection) {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: resolve("../", "mnt", "efs", "data", "database.db"),
    });
    global.connection = sequelize;
    const connection = global.connection;
    const User = connection.define("users", {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
    });
    await sequelize.sync({ alter: true });
    console.log("**INFO", "Creating new connection");
    return { connection, User };
  }
  /**
   * @type {Sequelize}
   */
  const connection = global.connection;
  const User = connection.define("users", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
  });
  console.log("**INFO", "Using existing Connection");
  await connection.sync({ alter: true });

  return { connection, User };
}

app.get("/api/info", async (req, res) => {
  try {
    res.send({ message: "info" });
  } catch (error) {
    res.send({ error });
  }
});
app.get("/api/v1/create", async (req, res) => {
  try {
    const { User } = await buildCache();
    await User.create({});
    const data = await User.findAll();
    console.log(data);
    res.status(202).send({ data });
  } catch (error) {
    res.status(500).send({ error });
  }
});
app.listen(3000, () => console.log(`Listening on: 3000`));
