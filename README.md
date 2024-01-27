# Migration

- Generate migration: typeorm migration:create ./migration/<migration-file-name>
- Run all migrations: typeorm-ts-node-esm migration:run -d src/data-source.ts

#Docker
build docker build . -t <imageTag>

run the container in the background: docker run --rm -d -p <port:port>/tcp <image-tag-name>:<image-version>
see the logs: docker logs -f <container-id>
