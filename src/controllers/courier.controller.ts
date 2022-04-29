import { Courier } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import CourierService from '@services/courier.service'
import log from '@utils/logger'
import createError from 'http-errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { CourierLookupBody } from '@schemas/courierLookup.schema'
import { LimitAndSortParams } from '@schemas/limitAndSortParams.schema'

class CourierController {
  public courierService = new CourierService()

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { skip, take, sortBy, sortOrder } = req.query as LimitAndSortParams

    try {
      res.status(200).json(await this.courierService.get(take, skip, sortBy, sortOrder))
    } catch (err: any) {
      log.error('Error while getting couriers', err.message)
      next(err)
    }
  }

  public getSingle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courier: Courier | null = await this.courierService.getSingle(parseInt(req.params.id))
      if (!courier) {
        return next(new createError.NotFound(`Courier with id ${req.params.id} not found`))
      }
      res.status(200).json(courier)
    } catch (err: any) {
      log.error('Error while getting couriers', err.message)
      next(err)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(201).json(await this.courierService.create(req.body))
    } catch (err: any) {
      log.error('Error while creating courier', err.message)
      next(err)
    }
  }

  public updateCapacity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    try {
      res.status(200).json(await this.courierService.updateCapacity(parseInt(id), req.body.difference))
    } catch (err: any) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        return next(new createError.NotFound(`Courier with id ${id} not found`))
      } else {
        log.error('Error while updating courier', err.message)
        next(err)
      }
    }
  }

  public remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    try {
      const courier = await this.courierService.remove(parseInt(id))
      res.status(200).json(courier)
    } catch (err: any) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        return next(new createError.NotFound(`Courier with id ${id} not found`))
      } else {
        log.error('Error while deleting courier', err.message)
        next(err)
      }
    }
  }

  public lookupAvailableCouriers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { skip, take, sortBy, sortOrder } = req.query as LimitAndSortParams
    const { capacity_required } = req.body as CourierLookupBody

    try {
      res.status(200).json(await this.courierService.lookupAvailableCouriers(capacity_required, take, skip, sortBy, sortOrder)
      )
    } catch (err: any) {
      log.error('Error while getting couriers', err.message)
      next(err)
    }
  }
}

export default CourierController
