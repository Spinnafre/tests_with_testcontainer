import { Repository } from "typeorm";
import { User } from "../entities/User";

export class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }

  async remove(id: number): Promise<number> {
    const output = await this.repository.delete(id);
    return output.affected!;
  }
}
