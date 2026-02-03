import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import ScalarFastifyApiReference from '@scalar/fastify-api-reference'
import fastify, { FastifyInstance } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import apiRoutes from './routes/api.route'
import pesquisadorRoutes from './routes/researcher.route'
import userRoutes from './routes/user.route'

//Instaciar o servidor
const server: FastifyInstance = fastify().withTypeProvider<ZodTypeProvider>()

//Configurações
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

//Plugins
server.register(fastifyCors, {
  origin: true,
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Mini Hands-on:',
      version: '1.0.0',
      description: 'Construindo sua Primeira API RESTful para fins didaticos!',
    },
  },
  transform: jsonSchemaTransform,
})

//rotas
// server.get('/', (req: FastifyRequest, replay: FastifyReply) => {
//   replay.status(200).send({ message: 'servidor ok' })
// })

server.register(ScalarFastifyApiReference, {
  routePrefix: '/docs',
  configuration: {
    theme: 'kepler',
  },
})

server.register(userRoutes)
server.register(pesquisadorRoutes)
server.register(apiRoutes)

//configurações de porta
server.listen(
  {
    port: 3000,
  },
  () => {
    console.log('Server runnig port 3000')
  },
)
