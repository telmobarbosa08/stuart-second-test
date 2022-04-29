import { Courier } from '@prisma/client'
import request from 'supertest'
import App from '@/app'
import { prismaMock } from '../utils/PrismaMockClientSingleton'
import CouriersCheckRoute from '@routes/couriers.route'
import { CourierLookupBody } from '@schemas/courierLookup.schema'

describe('Testing Couriers API', () => {
  describe('[GET] /couriers', () => {
    it('response findAll couriers', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const couriers: Courier[] = [
        {
          id: 1,
          max_capacity: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          max_capacity: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          max_capacity: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      prismaMock.courier.findMany.mockResolvedValue(couriers)

      const res = await request(new App([couriersCheckRoute]).getServer()).get(`${couriersCheckRoute.path}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBe(3)
    })
  })

  describe('[GET] /couriers/:id', () => {
    test('should findOne courier', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const courier: Courier = {
        id: 1,
        max_capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      prismaMock.courier.findUnique.mockResolvedValue(courier)

      const res = await request(new App([couriersCheckRoute]).getServer()).get(`${couriersCheckRoute.path}/${1}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('id', courier.id)
      expect(res.body).toHaveProperty('max_capacity', courier.max_capacity)
    })

    test('should findOne courier return 404 on non existing id', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const res = await request(new App([couriersCheckRoute]).getServer()).get(`${couriersCheckRoute.path}/${1}`)
      expect(res.statusCode).toEqual(404)
    })
  })

  describe('[POST] /couriers', () => {
    test('should create new courier', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const createCourierBody = {
        max_capacity: 10
      }
      const courier: Courier = {
        ...createCourierBody,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      prismaMock.courier.create.mockResolvedValue(courier)

      const res = await request(new App([couriersCheckRoute]).getServer()).post(`${couriersCheckRoute.path}`).send(createCourierBody)
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('max_capacity', courier.max_capacity)
    })

    test('should create new courier return 400 on negative capacity', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const createCourierBody = {
        max_capacity: -1
      }
      const courier: Courier = {
        ...createCourierBody,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      prismaMock.courier.create.mockResolvedValue(courier)

      const res = await request(new App([couriersCheckRoute]).getServer()).post(`${couriersCheckRoute.path}`).send(createCourierBody)
      expect(res.statusCode).toEqual(400)
    })
  })

  describe('[PUT] /couriers/:id', () => {
    it('response Update courier capacity', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const capacityChangeBody = {
        difference: 2
      }

      const courier: Courier = {
        id: 1,
        max_capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      prismaMock.courier.update.mockResolvedValue(courier)

      const res = await request(new App([couriersCheckRoute]).getServer()).put(`${couriersCheckRoute.path}/${1}/capacity`).send(capacityChangeBody)
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('[DELETE] /couriers/:id', () => {
    it('response Delete courier', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const courier: Courier = {
        id: 1,
        max_capacity: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      prismaMock.courier.findUnique.mockResolvedValue(courier)
      prismaMock.courier.delete.mockResolvedValue(courier)

      const res = await request(new App([couriersCheckRoute]).getServer()).del(`${couriersCheckRoute.path}/${1}`)
      expect(res.statusCode).toEqual(200)
    })
  })

  describe('[GET] /couriers/lookup', () => {
    test('should find couriers with available capacity', async () => {
      const couriersCheckRoute = new CouriersCheckRoute()
      couriersCheckRoute.courierController.courierService.prisma = prismaMock

      const courierLookupBody: CourierLookupBody = { capacity_required: 1 }

      const res = await request(new App([couriersCheckRoute]).getServer()).get(`${couriersCheckRoute.path}/lookup`).send(courierLookupBody)
      expect(res.statusCode).toEqual(200)
    })
  })
})
