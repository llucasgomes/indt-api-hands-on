import { FastifyReply, FastifyRequest } from 'fastify'
import { criarPesquisadorSchema } from '../schemas/researcher.schema'

export const validarCriacaoPesquisador = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const result = criarPesquisadorSchema.safeParse(req.body)

  if (!result.success) {
    return reply.status(400).send({
      message: 'Erro de validação',
      errors: result.error.format(),
    })
  }

  // substitui o body pelo objeto validado
  req.body = result.data
}
