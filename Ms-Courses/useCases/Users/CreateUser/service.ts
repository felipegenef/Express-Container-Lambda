import UserRepository from "../../../data/repositories/interfaces/userRepositoryInteface";
import Service from "../../../Global/interfaces/Service";
import logger from "../../../logger";
import AWS from "aws-sdk";
const sqs = new AWS.SQS({
  region: "us-east-1",
  endpoint: process.env.VPC_ENDPOINT_URL,
});
export default class CreateUserService implements Service {
  private repository: UserRepository;
  private logger: typeof logger;
  constructor(repository: UserRepository) {
    this.repository = repository;
    this.logger = logger;
  }
  async execute(user: { name: string; password: string }) {
    const data = await this.repository.create({
      name: user.name,
      hashedPassword: user.password,
    });
    this.logger.info("User Created");
    await sqs
      .sendMessage({
        QueueUrl: process.env.DUPLICATE_USERS_QUEUE_URL,
        MessageBody: JSON.stringify({
          name: user.name,
          password: user.password,
        }),
      })
      .promise();

    return { message: "created" };
  }
}
