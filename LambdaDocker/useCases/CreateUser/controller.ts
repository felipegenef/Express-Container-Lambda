import { Request, Response } from "express";
import Controller from "../../Global/interfaces/ControllerInterface";
import CreateUserService from "./service";
import logger from "../../logger";
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
      const data = await this.service.execute({
        password: password,
        name: name,
      });
      return res.status(202).json({ data });
    } catch (error) {
      console.log(error);
      this.logger.error(error);
      return res.status(500).json({ error: "error" });
    }
  }
}
