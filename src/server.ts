import App from './app'
import HealthCheckRoute from '@routes/healthcheck.route'
import CouriersCheckRoute from '@routes/couriers.route'

const app = new App([
  new HealthCheckRoute(),
  new CouriersCheckRoute()
])
app.listen()
