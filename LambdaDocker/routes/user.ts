import { Router } from "express";
import createUser from "../useCases/CreateUser";
const router = Router();
/**
 * @swagger
 * /api/info:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/create", createUser);

router.get("/");

export default router;
