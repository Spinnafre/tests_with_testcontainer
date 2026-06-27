export class UserService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const user = this.repository.create(data);
        return await this.repository.save(user);
    }
    async remove(id) {
        const output = await this.repository.delete(id);
        return output.affected;
    }
}
//# sourceMappingURL=UserService.js.map