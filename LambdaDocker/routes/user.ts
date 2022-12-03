import { Router } from "express";
import createUser from "../useCases/Users/CreateUser";
import getUsers from "../useCases//Users/GetUsers";
const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints referentes a usuário
 */

/**
 * @swagger
 * /course/user/create:
 *   post:
 *     description: Cria um usuário
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       description: body da requisição
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  password:
 *                    type: string
 *                    required: true
 *              required:
 *                - name
 *                - password
 *     responses:
 *       202:
 *         description: Usuário criado com sucesso
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: object
 *                      properties:
 *                          message:
 *                            type: string
 *                            example: Usuário criado com sucesso!
 */
router.post("/create", createUser);
/**
 * @swagger
 * /course/user:
 *  get:
 *     description: Busca todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", getUsers);

export default router;
