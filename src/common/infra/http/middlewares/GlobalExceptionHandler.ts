import { Request, Response, NextFunction } from 'express';
import AppError from '@common/errors/AppError';

const globalExceptionHandler = (err: Error, req: Request, res: Response, _: NextFunction): Response<AppError> => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(502).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default globalExceptionHandler;
