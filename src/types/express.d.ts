import * as express from 'express';
import {JwtPayload} from './types.ts'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
