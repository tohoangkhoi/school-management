import "dotenv/config";
import { AppDataSource } from "./data-source";
import { appInit } from "./utilities/appInitialise";

AppDataSource.initialize()
  .then(async () => {
    await appInit();
  })
  .catch((error) => console.log(error));
