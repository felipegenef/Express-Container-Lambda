import { Request, Response } from "express";
import Controller from "../../../Global/interfaces/ControllerInterface";
import logger from "../../../logger";
import CreateUserService from "./service";

export default class CreateUserController implements Controller {
  private service: CreateUserService;
  private logger: typeof logger;
  constructor(service: CreateUserService) {
    this.service = service;
    this.logger = logger;
  }
  async handle(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      const users = await this.service.execute({
        password: password,
        name: name,
      });
      return res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      this.logger.error({ error });
      return res.status(500).json({ error: "error" });
    }
  }
}
