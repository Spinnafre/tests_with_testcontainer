import { Repository } from "typeorm";
import { Product } from "../entities/Product";
export declare class ProductService {
    private readonly repository;
    constructor(repository: Repository<Product>);
    create(data: Partial<Product>): Promise<Product>;
    remove(id: number): Promise<number>;
}
//# sourceMappingURL=ProductService.d.ts.map