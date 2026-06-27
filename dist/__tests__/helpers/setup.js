import { randomUUID } from "node:crypto";
import { DataSource } from "typeorm";
import { env } from "../../config/env";
export async function setupTestSchema(entities) {
    const schema = `schema_${randomUUID().replace(/-/g, "_")}`;
    const dataSourceOptions = {
        type: "postgres",
        host: env.DB_HOST,
        port: env.DB_PORT,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
    };
    const rootDataSource = new DataSource(dataSourceOptions);
    await rootDataSource.initialize();
    await rootDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
    await rootDataSource.destroy();
    const dataSource = new DataSource({
        ...dataSourceOptions,
        schema,
        entities,
        synchronize: true,
        logging: false,
    });
    await dataSource.initialize();
    return { dataSource, schema };
}
export async function teardownTestSchema(dataSource, schema) {
    if (dataSource && dataSource.isInitialized) {
        try {
            await dataSource.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        }
        catch (err) {
            console.error(`Failed to drop schema ${schema}:`, err);
        }
        finally {
            await dataSource.destroy();
        }
    }
}
//# sourceMappingURL=setup.js.map