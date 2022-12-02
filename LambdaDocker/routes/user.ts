import { Router } from "express";
import createUser from "../useCases/CreateUser";
import getUsers from "../useCases/GetUsers";
const router = Router();
/**
 * @swagger
 * /course/user:
 *   post:
 *     description: Cria um usuário
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post("/create", createUser);
/**
 * @swagger
 * /course/user:
 *   get:
 *     description: Busca todos os usuários
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", getUsers);

export default router;
