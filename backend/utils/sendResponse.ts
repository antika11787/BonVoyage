import { Response } from "express";

const response = (
  res: Response,
  code: number,
  msg: string,
  data: any = null
) => {
  if (code >= 200 && code < 300) {
    return res.status(code).send({
      success: true,
      message: msg,
      data: data,
    });
  }
  return res.status(code).send({
    success: false,
    message: msg,
    error: data,
  });
};

export default response;
