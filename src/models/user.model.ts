import { User } from '@prisma/client'
import { prisma } from '../lib/prisma-client'
import { CreateUserDTO, UpdateUserDTO } from '../TDO/user.tdo'

/**
 * Criar User
 */
export const SalvarUserModel = async (data: CreateUserDTO): Promise<User> => {
  return prisma.user.create({
    data,
  })
}

/**
 * Listar Users
 */
export const ListarUserModel = async (): Promise<User[]> => {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Buscar User por ID
 */
export const RecuperarUmUserModel = async (
  id: string,
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  })
}

/**
 * Atualizar User
 */
export const AtualizarUserModel = async (
  id: string,
  data: UpdateUserDTO,
): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
  })
}

/**
 * Soft delete (status = INACTIVE)
 */
export const DeletarUserModel = async (id: string): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { status: 'INACTIVE' },
  })
}

export const BuscarUserPorEmailModel = async (
  email: string,
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  })
}
