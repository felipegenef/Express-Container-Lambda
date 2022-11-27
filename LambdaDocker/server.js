const { PrismaClient } = require("@prisma/client");

let prisma;
/**
 * Returns All models from application
 * @returns {PrismaClient}
 */
async function buildCache() {
  if (!global.prisma) {
    console.log("**INFO", "Building new Connection.");
    global.prisma = await new PrismaClient();
    prisma = global.prisma;
    return prisma;
  }
  console.log("**INFO", "Using existing Connection");
  prisma = global.prisma;
  return prisma;
}
module.exports.handler = async (event) => {
  try {
    const connection = await buildCache();
    const response = await connection.user.create({
      data: { email: new Date(), name: "name" },
    });
    const data = await connection.user.findMany();
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
