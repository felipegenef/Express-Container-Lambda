import UserRepository from "../../data/repositories/interfaces/userRepositoryInteface";
import Service from "../../Global/interfaces/Service";

export default class CreateUserService implements Service {
  private repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  async execute(user: { name: string; password: string }) {
    const users = await this.repository.getAll();
    return { users };
  }
}
