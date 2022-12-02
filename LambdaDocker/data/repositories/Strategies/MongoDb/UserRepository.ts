import { DataSource } from "typeorm";
import { User } from "../../../../entities/User";
import db from "../../../db";
import UserRepository, {
  createUserType,
} from "../../interfaces/userRepositoryInteface";

export default class CreateUserMongoDb implements UserRepository {
  private createConnection: () => Promise<DataSource>;
  constructor() {
    this.createConnection = db;
  }
  private async getTypeOrmRepos() {
    const connection = await this.createConnection();
    const userQuerier = connection.getRepository(User);
    return { userQuerier };
  }
  async create(user: createUserType) {
    const { userQuerier } = await this.getTypeOrmRepos();
    const data = userQuerier.create(user);
    await userQuerier.save(data);
    return true;
  }
}
