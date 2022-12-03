"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("./controller"));
const service_1 = __importDefault(require("./service"));
const UserRepository_1 = __importDefault(require("../../data/repositories/Strategies/Sqlite/UserRepository"));
const UserRepository_2 = __importDefault(require("../../data/repositories/Strategies/MongoDb/UserRepository"));
const strategiesEnum = {
    Sqlite: new UserRepository_1.default(),
    Mongodb: new UserRepository_2.default(),
};
const repository = strategiesEnum[process?.env?.strategy ?? "Sqlite"];
const service = new service_1.default(repository);
const controller = new controller_1.default(service);
exports.default = controller.handle.bind(controller);
//# sourceMappingURL=index.js.map