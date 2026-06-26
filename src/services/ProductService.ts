import { Repository } from "typeorm";
import { Product } from "../entities/Product";

export class ProductService {
  constructor(private readonly repository: Repository<Product>) {}

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.repository.create(data);
    return await this.repository.save(product);
  }

  async remove(id: number): Promise<number> {
    const output = await this.repository.delete(id);
    return output.affected!;
  }
}
