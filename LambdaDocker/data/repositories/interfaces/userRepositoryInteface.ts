export type createUserType = {
  id?: string;
  name: string;
  hashedPassword: string;
};
export default interface UserRepository {
  create: (user: createUserType) => Promise<boolean>;
}
