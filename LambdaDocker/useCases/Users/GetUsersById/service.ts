import UserRepository from "../../../data/repositories/interfaces/userRepositoryInteface";
import Service from "../../../Global/interfaces/Service";
import logger from "../../../logger";

export default class GetUsersService implements Service {
  private repository: UserRepository;
  private logger: typeof logger;
  constructor(repository: UserRepository) {
    this.repository = repository;
    this.logger = logger;
  }
  async execute(userId: string) {
    const user = await this.repository.getOne(userId);
    return { user };
  }
}
