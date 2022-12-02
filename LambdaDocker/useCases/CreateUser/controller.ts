import { Request, Response } from "express";
import CreateUserService from "./service";

export default class CreateUserController {
  private service: CreateUserService;
  constructor(service: CreateUserService) {
    this.service = service;
  }
  async handle(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      const data = await this.service.execute({
        password: password,
        name: name,
      });
      res.status(202).json({ data });
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  }
}
