import Controller from "./controller";
import Service from "./service";
import SqliteRepository from "../../../data/repositories/Strategies/Sqlite/UserRepository";
import MongoDbRepository from "../../../data/repositories/Strategies/MongoDb/UserRepository";

const strategiesEnum = {
  Sqlite: new SqliteRepository(),
  Mongodb: new MongoDbRepository(),
};

const repository = strategiesEnum[process?.env?.strategy ?? "Sqlite"];

const service = new Service(repository);
const controller = new Controller(service);

export default controller.handle.bind(controller);
