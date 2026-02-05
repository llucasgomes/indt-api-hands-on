import z from 'zod/v4'

export const LeituraSchema = z.object({
  umidade: z
    .number()
    .min(0, 'Umidade mínima é 0')
    .max(100, 'Umidade máxima é 100'),

  temperatura: z
    .number()
    .min(-50, 'Temperatura mínima é -50°C')
    .max(100, 'Temperatura máxima é 100°C'),

  sensor_id: z.uuid('ID do sensor inválido'),
})

export const LeituraResponseSchema = z.object({
  id: z.uuid(),
  umidade: z.number().min(0).max(100),
  temperatura: z.number().min(-50).max(100),
  dataHora: z.coerce.date(),
  sensorId: z.uuid(),
  createdAt: z.coerce.date(),
})
