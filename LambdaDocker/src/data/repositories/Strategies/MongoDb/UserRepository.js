"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../../entities/User");
const db_1 = __importDefault(require("../../../db"));
class CreateUserMongoDb {
    createConnection;
    constructor() {
        this.createConnection = db_1.default;
    }
    async getTypeOrmRepos() {
        const connection = await this.createConnection();
        const userQuerier = connection.getRepository(User_1.User);
        return { userQuerier };
    }
    async create(user) {
        const { userQuerier } = await this.getTypeOrmRepos();
        const data = userQuerier.create(user);
        await userQuerier.save(data);
        return true;
    }
    async getAll() {
        const { userQuerier } = await this.getTypeOrmRepos();
        const users = await userQuerier.find();
        return users;
    }
}
exports.default = CreateUserMongoDb;
//# sourceMappingURL=UserRepository.js.map