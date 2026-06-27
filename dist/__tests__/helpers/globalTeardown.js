export default async function globalTeardown() {
    const container = globalThis.__POSTGRES_CONTAINER__;
    if (container) {
        await container.stop();
    }
}
//# sourceMappingURL=globalTeardown.js.map