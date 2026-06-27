export class ProductService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        const product = this.repository.create(data);
        return await this.repository.save(product);
    }
    async remove(id) {
        const output = await this.repository.delete(id);
        return output.affected;
    }
}
//# sourceMappingURL=ProductService.js.map