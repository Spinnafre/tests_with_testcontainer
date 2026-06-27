import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';

export default async function globalSetup() {
  const container = await new PostgreSqlContainer('postgres:16-alpine')
    .withTmpFs({ '/var/lib/postgresql/data': 'rw' })
    .withName('integration-test-db')
    .withReuse()
    .start();

  (globalThis as any).__POSTGRES_CONTAINER__ = container;

  const host = container.getHost();
  const port = container.getPort().toString();
  const username = 'test';
  const password = 'test';
  const database = 'integration_test_db';

  const rootDataSource = new DataSource({
    type: 'postgres',
    host,
    port: parseInt(port, 10),
    username,
    password,
    database: 'postgres',
  });

  await rootDataSource.initialize();
  const dbExists = await rootDataSource.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [database],
  );
  if (dbExists.length === 0) {
    await rootDataSource.query(`CREATE DATABASE "${database}"`);
  }
  await rootDataSource.destroy();

  process.env.NODE_ENV = 'test';
  process.env.DB_HOST = host;
  process.env.DB_PORT = port;
  process.env.DB_USERNAME = username;
  process.env.DB_PASSWORD = password;
  process.env.DB_NAME = database;
}
