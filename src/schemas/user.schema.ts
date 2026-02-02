import { z } from 'zod'

export const UserBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(5),
  email: z.string().email(),
  gender: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateUserSchema = z.object({
  name: z.string().min(5, 'Nome deve ter pelo menos 5 caracteres'),
  email: z.string().email('Email inválido'),
  gender: z.string().min(1, 'Gênero é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(5).optional(),
  email: z.string().email().optional(),
  gender: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
})

export const UserParamsSchema = z.object({
  id: z.string().uuid('ID inválido'),
})
