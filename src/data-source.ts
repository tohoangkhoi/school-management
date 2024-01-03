import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432", 10), // Parse as an integer, replace with your actual port
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  ssl: true,
  entities: [User],
  migrations: ["migration/*.ts"],
  subscribers: [],
});
