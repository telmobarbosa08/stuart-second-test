import express, { Application, NextFunction, Request, Response } from 'express'
import log from '@utils/logger'
import errorHandler from '@utils/errors/errorHandler'
import createError from 'http-errors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Routes } from '@interfaces/routes.interface'
import { NODE_ENV, PORT } from '@config'

class App {
  public app: Application;
  public env: string;
  public port: string | number;

  constructor (routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV
    this.port = PORT

    this.initializeMiddlewares()
    this.initializeSwagger()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public listen () {
    this.app.listen(this.port, () => {
      log.info(`ENV: ${this.env}`)
      log.info(`App running at http://localhost:${this.port}`)
    })
  }

  public getServer () {
    return this.app
  }

  private initializeMiddlewares (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes (routes: Routes[]): void {
    routes.forEach(route => this.app.use(route.path, route.router))
    this.app.use((req: Request, res: Response, next: NextFunction) => { next(new createError.NotFound()) }) // ' Not found handler
  }

  private initializeSwagger () {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Docs for Stuart test 2 API'
        }
      },
      apis: ['*/routes/*.ts', './routes/*.js']
    }

    const specs = swaggerJSDoc(options)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
  }

  private initializeErrorHandling (): void {
    this.app.use(errorHandler)
  }
}

export default App
