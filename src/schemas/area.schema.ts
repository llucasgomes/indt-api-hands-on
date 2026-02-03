import { z } from 'zod/v4'

export const AreaSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .describe('Nome da área'),

  descricao: z.string().optional().describe('Descrição da área'),

  bioma: z
    .enum(['FLORESTA', 'DESERTO', 'SAVANA', 'TUNDRA', 'AQUATICO'])
    .describe('Bioma da área'),

  latitude: z.number().min(-90).max(90).describe('Latitude da área'),

  longitude: z.number().min(-180).max(180).describe('Longitude da área'),

  largura: z
    .number()
    .positive('Largura deve ser maior que 0')
    .describe('Largura da área'),

  comprimento: z
    .number()
    .positive('Comprimento deve ser maior que 0')
    .describe('Comprimento da área'),

  relevo: z.string().optional().describe('Tipo de relevo'),
})

export const AreaResponseSchema = AreaSchema.extend({
  id: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
