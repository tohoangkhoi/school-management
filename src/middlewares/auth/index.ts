import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import { generateAccessToken, setClientCookie } from "../../utilities/auth/helper";
import { AdminJwtPayload } from "../../utilities/auth/model";
import { formatErrorMsg } from "../../utilities/errors/helper";
import { GENERIC_ERRORS } from "../../utilities/global/constants/errors";
const { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY } = process.env;

/**
 * TODO: Refactor
 * Generate a baseAuthMiddleWare [verifyRefreshToken, verifyAccessToken]
 */

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { cookies } = req;

  if (!cookies || isEmpty(cookies) || !cookies?.accessToken) {
    return res.status(404).json({
      message: "Unauthorised",
    });
  }

  const { accessToken, refreshToken } = cookies;

  try {
    const isValid = verifyAccessToken(accessToken);

    if (!isValid) {
      const validRefreshToken = verifyRefreshToken(refreshToken) as AdminJwtPayload;

      if (!validRefreshToken) {
        return res.status(404).json({
          message: "Unauthorised",
        });
      }
      console.info("Acccess token is expired, but refresh token is still valid. Regenerating accessToken");
      const { id, firstName, lastName } = validRefreshToken;
      resetAccessTokenInCookie({ id, firstName, lastName }, res);
      console.info("Acccess token was regenerated successfully.");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(400).send(GENERIC_ERRORS.OPERATION.OTHER);
  }
};

const verifyAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY);
    return decoded;
  } catch (error) {
    if (error.message === GENERIC_ERRORS.API.AUTH.TOKEN_EXPIRED) {
      return;
    }

    console.error(error);
    throw new Error(formatErrorMsg("verifyAccessToken", GENERIC_ERRORS.OPERATION.OTHER));
  }
};

const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_PRIVATE_KEY);
    return decoded;
  } catch (error) {
    console.error(error);
    throw new Error(formatErrorMsg("verifyAccessToken", GENERIC_ERRORS.OPERATION.OTHER));
  }
};

const resetAccessTokenInCookie = (payload: AdminJwtPayload, res: Response) => {
  const accessToken = generateAccessToken(payload);
  setClientCookie(res, "acessToken", accessToken);
};
