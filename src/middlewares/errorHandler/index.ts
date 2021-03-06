import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import logger from "../../utils/logger";
import { errorResponse } from "../../utils/responses";
import ApiError from "./ApiError";

const errorHandler = (
  err: ErrorRequestHandler | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let message = "Oops, something went wrong. Please try again later";
  let errCode = 500;

  if (err instanceof ApiError) {
    message = err.message;
    errCode = err.code;
  } else if (err instanceof MongooseError.CastError) {
    //handle mongoose cast error
    message = `Invalid ${err.path}: ${err.value}.`;
    errCode = 400;
  } else if (err instanceof MongooseError.ValidationError) {
    //handle mongoose field validation error
    const errors: string[] = Object.values(err.errors).map(
      (
        error:
          | MongooseError.CastError
          | MongooseError.ValidationError
          | MongooseError.ValidatorError
      ) => error.message
    );

    message = `Invalid input data. ${errors.join(". ")}`;
    errCode = 400;
  } else if ((err as MongoError).code === 11000) {
    //handle mongoose duplicate field errors
    const value: string =
      (err as MongoError).errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "";

    message = `Duplicate field value: ${value}. Please use another value!`;
    errCode = 400;
  } else if (
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError ||
    err instanceof TypeError ||
    err instanceof URIError
  ) {
    //handle global error types
    message = err.message;
    errCode = 400;
  }
  errorResponse(res, errCode, message);
};
