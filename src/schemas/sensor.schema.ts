import { z } from 'zod/v4'

export const SensorSchema = z.object({
  serialNumber: z
    .string()
    .regex(/^[A-Za-z0-9]{8}$/, 'Serial deve ter 8 caracteres alfanuméricos')
    .describe('Número de série do sensor'),

  fabricante: z.string().min(1).describe('Fabricante do sensor'),
  modelo: z.string().min(1).describe('Modelo do sensor'),
  tipo: z.string().min(1).describe('Tipo do sensor'),

  status: z
    .enum(['ATIVO', 'INATIVO', 'MANUTENCAO'])
    .describe('Status do sensor'),

  ipFixo: z.string().optional().describe('IP fixo do sensor'),

  dataInstalacao: z.date().describe('Data de instalação'),

  dataManutencao: z.date().optional().describe('Data da última manutenção'),

  cicloLeitura: z
    .number()
    .int()
    .positive()
    .describe('Intervalo de leitura em segundos'),

  latitude: z.number().min(-90).max(90).describe('Latitude do sensor'),

  longitude: z.number().min(-180).max(180).describe('Longitude do sensor'),

  finalidade: z.string().optional().describe('Finalidade do sensor'),

  areaId: z.uuid().describe('ID da área associada'),
})

export const SensorResponseSchema = SensorSchema.extend({
  id: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
