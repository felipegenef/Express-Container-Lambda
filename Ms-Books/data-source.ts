import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  //@ts-ignore
  type: process?.env?.DB_TYPE ?? "sqlite",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //@ts-ignore
  database: process?.env?.DATABASE_URL2 ?? "../mnt/efs/data/database2.db",
  synchronize: false,
  logging: false,

  entities: [__dirname + "/entities/*.{js,ts}"],
  migrations: [__dirname + "/migrations/*.{js,ts}"],
});
