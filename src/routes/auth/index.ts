import express from "express";
import { loginReqBodyValidation } from "../../middlewares/request-validation/auth";
import { login } from "./handler";
const authRouter = express.Router();

// authRouter.post("/login", (login));
authRouter.post("/login", [loginReqBodyValidation], login);

export default authRouter;
