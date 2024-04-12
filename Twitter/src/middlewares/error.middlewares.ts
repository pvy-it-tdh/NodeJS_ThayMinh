import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTPSTATUS from '~/constants/httpStatus'
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || HTTPSTATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
