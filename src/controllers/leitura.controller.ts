import { FastifyInstance } from 'fastify'
import z from 'zod/v4'

import { validate } from '../middlewares/validate'
import { LeituraResponseSchema, LeituraSchema } from '../schemas/leitura.schema'
import {
  createLeituraService,
  deleteLeituraService,
  getAllLeiturasService,
  getLeituraByIdService,
  updateLeituraService,
} from '../services/leitura.service'

export default async function leituraController(server: FastifyInstance) {
  server.post(
    '/readings',
    {
      preHandler: validate(LeituraSchema),
      schema: {
        description: 'Cria uma nova leitura',
        tags: ['Leitura'],
        body: LeituraSchema,
        response: {
          201: LeituraResponseSchema.describe('Leitura criada com sucesso'),
          400: z
            .object({
              message: z.string(),
            })
            .describe('Dados inválidos'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Erro interno do servidor'),
        },
      },
    },
    createLeituraService,
  )

  server.get(
    '/readings',
    {
      schema: {
        description: 'Retorna todas as leituras',
        tags: ['Leitura'],
        response: {
          200: z.array(LeituraResponseSchema).describe('Lista de leituras'),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getAllLeiturasService,
  )

  server.get(
    '/readings/:id',
    {
      schema: {
        description: 'Retorna uma leitura específica pelo ID',
        tags: ['Leitura'],
        params: z.object({
          id: z.uuid('ID inválido'),
        }),
        response: {
          200: LeituraResponseSchema.describe('Leitura encontrada'),
          404: z
            .object({
              message: z.string(),
            })
            .describe('Leitura não encontrada'),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getLeituraByIdService,
  )

  server.put(
    '/readings/:id',
    {
      preHandler: validate(LeituraSchema),
      schema: {
        description: 'Atualiza uma leitura pelo ID',
        tags: ['Leitura'],
        params: z.object({
          id: z.uuid('ID inválido'),
        }),
        body: LeituraSchema,
        response: {
          200: LeituraResponseSchema.describe('Leitura atualizada com sucesso'),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    updateLeituraService,
  )

  server.delete(
    '/readings/:id',
    {
      schema: {
        description: 'Remove uma leitura pelo ID',
        tags: ['Leitura'],
        params: z.object({
          id: z.uuid('ID inválido'),
        }),
        response: {
          204: z.null().describe('Leitura removida'),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    deleteLeituraService,
  )
}
