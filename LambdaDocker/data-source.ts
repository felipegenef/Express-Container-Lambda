import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSource = new DataSource({
  //@ts-ignore
  type: process?.env?.DB_TYPE ?? "sqlite",
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  //@ts-ignore
  database: process?.env?.DB_DATABASE ?? "../mnt/efs/data/database.db",
  synchronize: false,
  logging: false,

  entities: ["./entities/*.ts", "./entities/*.js"],
  migrations: ["./migrations/*.ts", "./migrations/*.js"],
});
