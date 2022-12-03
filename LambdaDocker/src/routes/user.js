"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUser_1 = __importDefault(require("../useCases/CreateUser"));
const GetUsers_1 = __importDefault(require("../useCases/GetUsers"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /course/user:
 *   post:
 *     description: Cria um usuário
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post("/create", CreateUser_1.default);
/**
 * @swagger
 * /course/user:
 *   get:
 *     description: Busca todos os usuários
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", GetUsers_1.default);
exports.default = router;
//# sourceMappingURL=user.js.map