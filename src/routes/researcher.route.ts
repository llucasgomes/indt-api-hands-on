import { FastifyInstance } from 'fastify'
import pesquisadorController from '../controllers/researcher.controller'

export default async function pesquisadorRoutes(server: FastifyInstance) {
  server.register(pesquisadorController, { prefix: '/api' })
}
