import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import { AnyObjectSchema } from 'yup'

/**
 * Validates requests using yup
 * If not valid, returns 400 - Bad Request
 * @param {AnyObjectSchema} schema is a yup schema
 */
const validateResource = (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (e: any) {
      next(createError(400, { message: e.errors }))
    }
  }

export default validateResource
