import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import logger from "../logger";
let db: DataSource | undefined;
async function createCache<DataSource>() {
  if (!db) {
    logger.info({ level: "info", message: "New Connection Created" });
    db = await AppDataSource.initialize();
    return db;
  }
  logger.info({ level: "info", message: "Using existing connection" });
  return db;
}

export default createCache;
