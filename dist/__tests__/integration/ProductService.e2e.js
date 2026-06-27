import { ProductService } from "../../services/ProductService";
import { Product } from "../../entities/Product";
import { setupTestSchema, teardownTestSchema } from "../helpers/setup";
describe("#Product", () => {
    let dataSource;
    let schema;
    let sut;
    beforeAll(async () => {
        const setupResult = await setupTestSchema([Product]);
        dataSource = setupResult.dataSource;
        schema = setupResult.schema;
        sut = new ProductService(dataSource.getRepository(Product));
    }, 60000);
    afterAll(async () => {
        await teardownTestSchema(dataSource, schema);
    });
    test("should be able to create a user successfully", async () => {
        const product = await sut.create({
            name: "playstation 2",
            price: 40028922,
        });
        expect(product.id).not.toBeNull();
        expect(product.name).toBe("playstation 2");
        expect(product.price).toBe(40028922);
    });
    test("should be able to delete a user successfully", async () => {
        const product = await sut.create({
            name: "playstation 3",
            price: 40028922,
        });
        const rowsAffected = await sut.remove(product.id);
        const deletedProduct = await dataSource.getRepository(Product).findOne({
            where: {
                id: product.id,
            },
        });
        expect(rowsAffected).toEqual(1);
        expect(deletedProduct).toBeNull();
    });
});
//# sourceMappingURL=ProductService.e2e.js.map