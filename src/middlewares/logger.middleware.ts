import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Requesting...');
    next();
  }
}

export const FunctionalLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('Functional middleware requesting...');
  next();
};
