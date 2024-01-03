import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
const { DB_URL } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ep-late-boat-63999583.ap-southeast-1.aws.neon.tech",
  port: 5432, // Replace with your actual port
  username: "tohoangkhoi",
  password: "YJkr8gOvGL0j",
  database: "small-erb-db",
  ssl: true,
  entities: [User],
  migrations: ["migration/*.ts"],

  subscribers: [],
});
