import { FastifyInstance } from 'fastify'
import areaController from '../controllers/area.controller'
import leituraController from '../controllers/leitura.controller'
import sensorController from '../controllers/sensor.controller'

export default async function apiRoutes(server: FastifyInstance) {
  server.register(areaController, { prefix: '/api' })
  server.register(sensorController, { prefix: '/api' })
  server.register(leituraController, { prefix: '/api' })
}
