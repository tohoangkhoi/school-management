import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
const { DB_URL } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_URL,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
