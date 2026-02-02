import { FastifyInstance } from 'fastify'
import userController from '../controllers/user.controller'

export default async function userRoutes(server: FastifyInstance) {
  server.register(userController, { prefix: '/api' })
}
