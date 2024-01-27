import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../entity/User";
import { UserRepository } from "../../repositories";
import { formatErrorMsg } from "../errors/helper";
import { GENERIC_ERRORS } from "../global/constants/errors";
import { AdminJwtPayload } from "./model";

export const getAdmin = async (): Promise<User> => {
  try {
    const admin = await UserRepository.findOneBy({
      firstName: "Minh",
      lastName: "Trang",
    });

    if (!admin) {
      throw new Error(formatErrorMsg("getAdmin", GENERIC_ERRORS.API.AUTH.GET_ADMIN));
    }

    return admin;
  } catch (error) {
    console.error(error);
    throw new Error(formatErrorMsg("getAdmin", GENERIC_ERRORS.API.AUTH.GET_ADMIN));
  }
};

export const generateAccessToken = (payload: AdminJwtPayload) => {
  try {
    const { ACCESS_TOKEN_PRIVATE_KEY } = process.env;
    return jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "5s" });
  } catch (error) {
    console.error(error);
    throw new Error(formatErrorMsg("generateAccessToken", GENERIC_ERRORS.OPERATION.OTHER));
  }
};

export const generateRefreshRoken = (payload: AdminJwtPayload) => {
  try {
    const { REFRESH_TOKEN_PRIVATE_KEY } = process.env;
    return jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "1d" });
  } catch (error) {
    console.error(error);
    throw new Error(formatErrorMsg("generateRefreshRoken", GENERIC_ERRORS.OPERATION.OTHER));
  }
};

export const setClientCookie = (res: Response, key: string, value: string) => {
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const cookieOption: CookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    expires: endOfDay,
  };
  res.cookie(key, value, { ...cookieOption });
};
