import { Router } from 'express'
import CourierController from '@controllers/courier.controller'
import { Routes } from '@interfaces/routes.interface'
import validateResource from '@middlewares/validateResource.middleware'
import { createCourierSchema, deleteCourierSchema, getCourierSchema, updateCapacitySchema } from '@schemas/courier.schema'
import { lookupCourierInput } from '@schemas/courierLookup.schema'

class CouriersRoute implements Routes {
  public path = '/couriers';
  public router = Router()
  public courierController = new CourierController()

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes () {
    /**
    *  @openapi
    *  /couriers:
    *    get:
    *      summary: Get couriers
    *      parameters:
    *        - in: query
    *          name: skip
    *          schema:
    *            type: number
    *            example: 0
    *          description: Number of couriers to skip
    *        - in: query
    *          name: take
    *          schema:
    *            type: number
    *            example: 10
    *          description: Number of couriers to take
    *      responses:
    *        200:
    *          description: A list of couriers
    */
    this.router.get('/', this.courierController.get)

    /**
     * @swagger
     * /couriers/{id}:
     *  get:
     *    summary: Get a courier by id
     *    parameters:
     *    - in: path
     *      name: id
     *      schema:
     *        type: number
     *        example: 1
     *      description: Id of the courier
     *      required: true
     *    responses:
     *      '200':
     *        description: A successful response
     *      '401':
     *        description: Courier not found
     */
    this.router.get('/:id(\\d+)', validateResource(getCourierSchema), this.courierController.getSingle)

    /**
     * @swagger
     * /couriers:
     *   post:
     *     summary: Create a courier
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               max_capacity:
     *                 type: number
     *                 example: 10
     *                 description: Courier max capacity.
     *     responses:
     *       '201':
     *         description: A successful response
    */
    this.router.post('/', validateResource(createCourierSchema), this.courierController.create)

    /**
     * @swagger
     * /couriers/{id}/capacity:
     *   put:
     *     summary: Update courier capacity
     *     parameters:
     *     - in: path
     *       name: id
     *       schema:
     *         type: number
     *         example: 1
     *       description: Id of the courier
     *       required: true
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               difference:
     *                 type: number
     *                 example: 2
     *                 description: Amount that changed.
     *     responses:
     *       '200':
     *         description: A successful response
     *       '401':
     *         description: Courier not found
    */
    this.router.put('/:id(\\d+)/capacity', validateResource(updateCapacitySchema), this.courierController.updateCapacity)

    /**
     * @swagger
     * /couriers:
     *   delete:
     *     summary: Delete a courier
     *     parameters:
     *     - in: path
     *       name: id
     *       schema:
     *         type: number
     *         example: 1
     *       description: Id of the courier
     *       required: true
     *     responses:
     *       '200':
     *         description: A successful response
     *       '401':
     *         description: Courier not found
    */
    this.router.delete('/:id(\\d+)', validateResource(deleteCourierSchema), this.courierController.remove)

    /**
     * @swagger
     * /lookup:
     *   get:
     *     summary: Find couriers by capacity
     *     parameters:
     *       - in: query
     *         name: skip
     *         schema:
     *           type: number
     *           example: 0
     *         description: Number of couriers to skip
     *       - in: query
     *         name: take
     *         schema:
     *           type: number
     *           example: 10
     *         description: Number of couriers to take
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               capacity_required:
     *                 type: number
     *                 example: 2
     *                 description: Amount that changed.
     *     responses:
     *       '200':
     *         description: A successful response
    */
    this.router.get('/lookup', validateResource(lookupCourierInput), this.courierController.lookupAvailableCouriers)
  }
}

export default CouriersRoute
