import { Router, Request, Response } from 'express'
import { Routes } from '@interfaces/routes.interface'

class HealthCheckRoute implements Routes {
  public router = Router()
  public path = '/healthcheck'

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes () {
  /**
   * @openapi
   * /healthcheck:
   *   get:
   *     tags:
   *       - Healthcheck
   *     summary: Healthcheck endpoint
   *     responses:
   *       200:
   *        description: OK
  */
    this.router.get('/', (req: Request, res: Response) => res.sendStatus(200))
  }
}

export default HealthCheckRoute
