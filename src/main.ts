import { AppDataSource } from "./data-source";
import { appInit } from "./utilities/appInitialise";

AppDataSource.initialize()
  .then(async () => {
    appInit();
  })
  .catch((error) => console.log(error));
