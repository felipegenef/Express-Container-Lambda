import { Router } from "express";
import createUser from "../useCases/Users/CreateUser";
import getUsers from "../useCases/Users/GetUsers";
import getUserById from "../useCases/Users/GetUsersById";
const router = Router();

/**
 * @swagger
 * /book/user/create:
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
 *                    required: true
 *                  password:
 *                    type: string
 *                    required: true
 *     responses:
 *       202:
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
 *       500:
 *         content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: object
 *                      properties:
 *                          error:
 *                            type: string
 *                            example: Field is required!
 */
router.post("/create", createUser);
/**
 * @swagger
 * /book/user:
 *  get:
 *     description: Busca todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                  type: object
 *                  properties:
 *                    users:
 *                      type: array
 *                      minItems: 3
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            example: 8ed930f7-3b59-4718-ab50-9ccc918dcaa4
 *                          name:
 *                            type: string
 *                            example: Jhon Doe
 *                          createdAt:
 *                            type: string
 *                            example: 2022-12-03T14:12:24.000Z
 *                          updatedAt:
 *                            type: string
 *                            example: 2022-12-03T14:12:24.000Z
 *                          deletedAt:
 *                            type: string
 *                            nullable: true
 *                            example: null
 *
 *
 */
router.get("/", getUsers);
/**
 * @swagger
 * /book/user/{userId}:
 *  get:
 *     tags: [Users]
 *     description: Busca um usuário por Id
 *     parameters:
 *       - name: userId
 *         description: id do usuário
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                 type: string
 *                 example: 8ed930f7-3b59-4718-ab50-9ccc918dcaa4
 *                name:
 *                  type: string
 *                  example: Jhon Doe
 *                createdAt:
 *                  type: string
 *                  example: 2022-12-03T14:12:24.000Z
 *                updatedAt:
 *                  type: string
 *                  example: 2022-12-03T14:12:24.000Z
 *                deletedAt:
 *                  type: string
 *                  nullable: true
 *                  example: null
 *
 */
router.get("/:userId", getUserById);

export default router;
