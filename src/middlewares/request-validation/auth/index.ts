import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import { GENERIC_ERRORS } from "../../../utilities/global/constants/errors";
import { REQUIRED_FIELDS } from "../constants";

export const loginReqBodyValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (isEmpty(body)) {
    return res.status(400).send(GENERIC_ERRORS.REQUEST.INVALID_ARGUMENTS);
  }

  const isMissingRequiredField = REQUIRED_FIELDS.LOGIN.some((field) => !body[field]);

  if (isMissingRequiredField) {
    return res.status(400).send(GENERIC_ERRORS.REQUEST.INVALID_ARGUMENTS);
  }

  if (body?.password?.length < 6) {
    return res.status(400).send(GENERIC_ERRORS.REQUEST.INVALID_ARGUMENTS);
  }

  next();
};
