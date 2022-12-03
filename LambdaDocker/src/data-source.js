"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Course_1 = require("./entities/Course");
exports.AppDataSource = new typeorm_1.DataSource({
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
    entities: [Course_1.Course, User_1.User],
    migrations: [__dirname + "/migrations/*.{js,ts}"],
});
//# sourceMappingURL=data-source.js.map