import { User } from "../../../entities/User";

export type createUserType = {
  id?: string;
  name: string;
  hashedPassword: string;
};
export default interface UserRepository {
  create: (user: createUserType) => Promise<boolean>;
  getAll: () => Promise<User[]>;
}
