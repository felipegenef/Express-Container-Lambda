"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
class CreateUserController {
    service;
    logger;
    constructor(service) {
        this.service = service;
        this.logger = logger_1.default;
    }
    async handle(req, res) {
        try {
            const { name, password } = req.body;
            const users = await this.service.execute({
                password: password,
                name: name,
            });
            return res.status(200).json({ users });
        }
        catch (error) {
            console.log(error);
            this.logger.error({ error });
            return res.status(500).json({ error: "error" });
        }
    }
}
exports.default = CreateUserController;
//# sourceMappingURL=controller.js.map