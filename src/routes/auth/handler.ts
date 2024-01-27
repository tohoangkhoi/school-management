import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshRoken, getAdmin, setClientCookie } from "../../utilities/auth/helper";
import { formatErrorMsg } from "../../utilities/errors/helper";
import { GENERIC_ERRORS } from "../../utilities/global/constants/errors";

export const login = async (req: Request, res: Response) => {
  //validate password
  try {
    const { password } = req.body || {};
    const admin = await getAdmin();

    const { id: adminId, password: adminHashPassword, firstName, lastName } = admin;
    const match = await bcrypt.compare(password, adminHashPassword);

    if (!match) {
      throw new Error(formatErrorMsg("login", GENERIC_ERRORS.API.AUTH.INVALID_CREDENTIALS));
    }

    const accessToken = generateAccessToken({ id: adminId, firstName, lastName });
    const refreshToken = generateRefreshRoken({ id: adminId, firstName, lastName });

    setClientCookie(res, "refreshToken", refreshToken);
    setClientCookie(res, "accessToken", accessToken);

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(GENERIC_ERRORS.OPERATION.OTHER);
  }
};
