import { Request, Response } from "express";
import UserRepository from "../../data/repositories/interfaces/userRepositoryInteface";

export default class CreateUserService {
  private repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  async execute(user: { name: string; password: string }) {
    const data = await this.repository.create({
      name: user.name,
      hashedPassword: user.password,
    });
    return { message: "created" };
  }
}
