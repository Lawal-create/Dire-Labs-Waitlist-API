import Waitlist from "../models/waitlist";
import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger/index";
import formatLog from "../utils/logger/formatLog";
import { successResponse } from "../utils/responses";

//Controller Logic to store waitlisters information
const waitlists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    Logger.info(formatLog(req, "Adding to a waitlist"));
    const { firstName, lastName, email, userType, description } = req.body;
    await Waitlist.create({
      firstName,
      lastName,
      email,
      userType,
      description
    });
    Logger.info(
      formatLog(
        req,
        `Successfully added ${firstName} ${lastName} to a waitlist`
      )
    );
    return successResponse<null>(
      res,
      200,
      "You have successfully been added to the waitlist",
      null
    );
  } catch (err) {
    next(err);
  }
};

export default waitlists;
