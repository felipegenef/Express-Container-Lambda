import { Request, Response } from "express";
import SQSController from "../../Global/interfaces/SQSControllerInterface";
import CreateUserService from "./service";
import logger from "../../logger";
import { SQSEvent, Context } from "aws-lambda";

export default class CreateUserController implements SQSController {
  private service: CreateUserService;
  private logger: typeof logger;
  constructor(service: CreateUserService) {
    this.service = service;
    this.logger = logger;
  }
  async handle(event: SQSEvent, context: Context) {
    for (const message of event.Records) {
      const bodyData = JSON.parse(message.body);

      console.log(bodyData);
      await this.service.execute({
        password: bodyData.password,
        name: bodyData.name,
      });
    }

    return true;
  }
}
