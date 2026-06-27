import { Repository } from 'typeorm';
import { User } from '../entities/User';
export declare class UserService {
    private readonly repository;
    constructor(repository: Repository<User>);
    create(data: Partial<User>): Promise<User>;
    remove(id: number): Promise<number>;
}
//# sourceMappingURL=UserService.d.ts.map