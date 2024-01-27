import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import { verifyTokenMiddleware } from "../../middlewares/auth";
import authRouter from "../../routes/auth";
const app = express();
const port = process.env.PORT || 8080;

export const appInit = () => {
  app.use(express.json());
  app.use(cookieParser());

  app.use("/auth", authRouter);

  app.get("/test", [verifyTokenMiddleware], (req: Request, res: Response) => {
    return res.send("School Management API.");
  });

  app.get("/", (req: Request, res: Response) => {
    return res.send("School Management API.");
  });

  app.listen(port, () => {
    console.info("App sucessfully is running on ", port);
  });
};
