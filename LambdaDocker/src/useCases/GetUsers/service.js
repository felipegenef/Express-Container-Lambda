"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
class CreateUserService {
    repository;
    logger;
    constructor(repository) {
        this.repository = repository;
        this.logger = logger_1.default;
    }
    async execute(user) {
        const users = await this.repository.getAll();
        return { users };
    }
}
exports.default = CreateUserService;
//# sourceMappingURL=service.js.map