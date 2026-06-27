import { DataSource, MixedList } from "typeorm";
export interface SetupTestSchemaResult {
    dataSource: DataSource;
    schema: string;
}
export declare function setupTestSchema(entities: MixedList<Function | string | any>): Promise<SetupTestSchemaResult>;
export declare function teardownTestSchema(dataSource: DataSource, schema: string): Promise<void>;
//# sourceMappingURL=setup.d.ts.map