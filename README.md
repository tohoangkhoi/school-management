# Migration

- Generate migration: typeorm migration:create ./migration/<migration-file-name>
- Run all migrations: typeorm-ts-node-esm migration:run -d src/data-source.ts
