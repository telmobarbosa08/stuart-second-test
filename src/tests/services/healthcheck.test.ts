import request from 'supertest'
import App from '@/app'
import HealthCheckRoute from '@routes/healthcheck.route'

describe('Testing Healthcheck API', () => {
  describe('[GET] /healthcheck', () => {
    it('response statusCode 200', async () => {
      const healthCheckRoute = new HealthCheckRoute()
      const res = await request(new App([healthCheckRoute]).getServer()).get(`${healthCheckRoute.path}`)
      expect(res.statusCode).toEqual(200)
    })
  })
})
