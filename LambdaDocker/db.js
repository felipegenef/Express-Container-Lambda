const { resolve } = require("path");
const { Sequelize, UUID, UUIDV4, BOOLEAN } = require("sequelize");
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
module.exports = buildCache;
