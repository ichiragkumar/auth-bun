import { Response } from "express";
import HttpStatus, { StatusCodes } from "http-status-codes";

export class ResponseHandler {
  static created(res: Response, data: any, message: string = ""): Response {
    return res.status(HttpStatus.CREATED).send({
      success: true,
      message,
      data,
    });
  }

  static success(res: Response, data: any, message: string = ""): Response {
    return res.status(HttpStatus.OK).send({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, error: any, message: string): Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message,
      data: error,
    });
  }

  static conflict(res: Response, error: any, message: string): Response{
    return res.status(HttpStatus.CONFLICT).send({
      success:false,
      message,
      data:error
    })
  }


  static notFound(res: Response, message: string): Response {
    return res.status(HttpStatus.NOT_FOUND).send({
      success: false,
      data: { message: message || "Not found." },
    });
  }

  static badRequest(res: Response, error: any, message: string): Response {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message,
      data: error,
    });
  }

  static throwError(res: Response, err: any): Response {
    const error = err.details.reduce((prev: any, curr: any) => {
      prev[curr.path[0]] = curr.message.replace(/"/g, "");
      return prev;
    }, {});

    const errorMessage = Object.values(error);

    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      data: { message: errorMessage[0] },
    });
  }

  static notAuthorized(res: Response, error: any): Response {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      success: false,
      data: { message: error },
    });
  }

  static tooManyRequests(res: Response, data: any, retryTime: any): Response {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).send({
      success: false,
      data: { message: data, otpExpireIn: retryTime },
    });
  }

  static tooLargeContent(res: Response, message: any): Response {
    return res
      .status(HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE)
      .send({
        success: false,
        data: { message },
      });
  }

  static redirect(res: Response, data: any): void {
    return res.redirect(data.redirectUrl);
  }
}
