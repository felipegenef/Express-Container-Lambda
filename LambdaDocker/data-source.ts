import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Course } from "./entities/Course";

export const AppDataSource = new DataSource({
  //@ts-ignore
  type: process?.env?.DB_TYPE ?? "sqlite",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //@ts-ignore
  database: process?.env?.DB_DATABASE ?? "../mnt/efs/data/database.db",
  synchronize: false,
  logging: false,

  entities: [Course, User],
  migrations: [__dirname + "/migrations/*.{js,ts}"],
});
