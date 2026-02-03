import { FastifyInstance } from 'fastify'
import z from 'zod/v4'

import { validate } from '../middlewares/validate'
import { SensorResponseSchema, SensorSchema } from '../schemas/sensor.schema'

import {
  createSensorService,
  deleteSensorService,
  getAllSensorsService,
  getSensorByIdService,
  updateSensorService,
} from '../services/sensor.service'

export default async function sensorController(server: FastifyInstance) {
  /**
   * Criar Sensor
   */
  server.post(
    '/sensors',
    {
      preHandler: validate(SensorSchema),
      schema: {
        description: 'Cria um novo sensor',
        tags: ['Sensor'],
        body: SensorSchema,
        response: {
          201: SensorResponseSchema.describe('Sensor criado com sucesso'),
          409: z
            .object({ message: z.string() })
            .describe('SerialNumber já cadastrado'),
          400: z.object({ message: z.string() }).describe('Dados inválidos'),
          500: z
            .object({ message: z.string() })
            .describe('Erro interno do servidor'),
        },
      },
    },
    createSensorService,
  )

  /**
   * Listar sensores
   */
  server.get(
    '/sensors',
    {
      schema: {
        description: 'Retorna todos os sensores',
        tags: ['Sensor'],
        response: {
          200: z.array(SensorResponseSchema).describe('Lista de sensores'),
        },
      },
    },
    getAllSensorsService,
  )

  /**
   * Buscar sensor por ID
   */
  server.get(
    '/sensors/:id',
    {
      schema: {
        description: 'Retorna um sensor específico pelo ID',
        tags: ['Sensor'],
        params: z.object({
          id: z.uuid().describe('ID do sensor'),
        }),
        response: {
          200: SensorResponseSchema.describe('Sensor encontrado'),
          404: z
            .object({ message: z.string() })
            .describe('Sensor não encontrado'),
        },
      },
    },
    getSensorByIdService,
  )

  /**
   * Atualizar sensor
   */
  server.put(
    '/sensors/:id',
    {
      preHandler: validate(SensorSchema),
      schema: {
        description: 'Atualiza um sensor específico pelo ID',
        tags: ['Sensor'],
        params: z.object({
          id: z.uuid(),
        }),
        body: SensorSchema,
        response: {
          200: SensorResponseSchema.describe('Sensor atualizado'),
          404: z
            .object({ message: z.string() })
            .describe('Sensor não encontrado'),
        },
      },
    },
    updateSensorService,
  )

  /**
   * Deletar sensor
   */
  server.delete(
    '/sensors/:id',
    {
      schema: {
        description: 'Remove um sensor pelo ID',
        tags: ['Sensor'],
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          204: z.null().describe('Sensor removido com sucesso'),
        },
      },
    },
    deleteSensorService,
  )
}
