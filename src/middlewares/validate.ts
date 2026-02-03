import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodSchema } from 'zod/v4'

export const validate =
  (schema: ZodSchema) => async (req: FastifyRequest, reply: FastifyReply) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return reply.status(400).send({
        message: 'Erro de validação',
        errors: result.error.flatten().fieldErrors,
      })
    }

    // corpo já validado e tipado
    req.body = result.data
  }
