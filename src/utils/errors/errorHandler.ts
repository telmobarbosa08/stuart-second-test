import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import log from '@utils/logger'

const errorHandler: ErrorRequestHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  log.error(err.message, err.stack)
  const statusCode = err.statusCode || 500
  res
    .status(statusCode)
    .json({
      status: statusCode,
      message: err.message
    })
}

export default errorHandler
