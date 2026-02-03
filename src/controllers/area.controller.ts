import { FastifyInstance } from 'fastify'
import z from 'zod/v4'

import { validate } from '../middlewares/validate'
import { AreaResponseSchema, AreaSchema } from '../schemas/area.schema'

import {
  createAreaService,
  deleteAreaService,
  getAllAreasService,
  getAreaByIdService,
  updateAreaService,
} from '../services/area.service'

export default async function areaController(server: FastifyInstance) {
  /**
   * Criar Área
   */
  server.post(
    '/areas',
    {
      preHandler: validate(AreaSchema),
      schema: {
        description: 'Cria uma nova área',
        tags: ['Area'],
        body: AreaSchema,
        response: {
          201: AreaResponseSchema.describe('Área criada com sucesso'),
          409: z
            .object({ message: z.string() })
            .describe('Já existe uma área com esse nome'),
          400: z.object({ message: z.string() }).describe('Dados inválidos'),
          500: z
            .object({ message: z.string() })
            .describe('Erro interno do servidor'),
        },
      },
    },
    createAreaService,
  )

  /**
   * Listar Áreas
   */
  server.get(
    '/areas',
    {
      schema: {
        description: 'Retorna todas as áreas',
        tags: ['Area'],
        response: {
          200: z.array(AreaResponseSchema).describe('Lista de áreas'),
        },
      },
    },
    getAllAreasService,
  )

  /**
   * Buscar Área por ID
   */
  server.get(
    '/areas/:id',
    {
      schema: {
        description: 'Retorna uma área específica pelo ID',
        tags: ['Area'],
        params: z.object({
          id: z.uuid().describe('ID da área'),
        }),
        response: {
          200: AreaResponseSchema.describe('Área encontrada'),
          404: z
            .object({ message: z.string() })
            .describe('Área não encontrada'),
        },
      },
    },
    getAreaByIdService,
  )

  /**
   * Atualizar Área
   */
  server.put(
    '/areas/:id',
    {
      preHandler: validate(AreaSchema),
      schema: {
        description: 'Atualiza uma área específica pelo ID',
        tags: ['Area'],
        params: z.object({
          id: z.uuid(),
        }),
        body: AreaSchema,
        response: {
          200: AreaResponseSchema.describe('Área atualizada'),
          404: z
            .object({ message: z.string() })
            .describe('Área não encontrada'),
        },
      },
    },
    updateAreaService,
  )

  /**
   * Deletar Área
   */
  server.delete(
    '/areas/:id',
    {
      schema: {
        description: 'Remove uma área pelo ID',
        tags: ['Area'],
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          204: z.null().describe('Área removida com sucesso'),
        },
      },
    },
    deleteAreaService,
  )
}
