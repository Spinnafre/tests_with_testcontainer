import { DataSource } from "typeorm";
import { UserService } from "../../services/UserService";
import { User } from "../../entities/User";
import { setupTestSchema, teardownTestSchema } from "../helpers/setup";

describe("#User", () => {
  let dataSource: DataSource;
  let schema: string;
  let sut: UserService;

  beforeAll(async () => {
    const setupResult = await setupTestSchema([User]);
    dataSource = setupResult.dataSource;
    schema = setupResult.schema;

    sut = new UserService(dataSource.getRepository(User));
  }, 60000);

  afterAll(async () => {
    await teardownTestSchema(dataSource, schema);
  });

  test("should be able to create a User successfully", async () => {
    const user = await sut.create({
      name: "Mr Spin",
      email: "mrspin@spin.com",
    });

    expect(user.id).not.toBeNull();
    expect(user.name).toBe("Mr Spin");
    expect(user.email).toBe("mrspin@spin.com");
  });

  test("should be able to delete a User successfully", async () => {
    const user = await sut.create({
      name: "Mr Spin 2",
      email: "mrspin2@spin.com",
    });

    const rowsAffected = await sut.remove(user.id);

    const deletedUser = await dataSource.getRepository(User).findOne({
      where: {
        id: user.id,
      },
    });

    expect(rowsAffected).toEqual(1);
    expect(deletedUser).toBeNull();
  });
});
