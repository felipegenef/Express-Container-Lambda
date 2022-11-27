const { Sequelize, UUID, UUIDV4 } = require("sequelize");
const { resolve } = require("path");

let connection;
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
    await sequelize.authenticate();

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

module.exports.handler = async (event) => {
  try {
    const { User } = await buildCache();
    await User.create({});
    const data = await User.findAll();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          data,
          // value,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          error,
        },
        null,
        2
      ),
    };
  }
};
