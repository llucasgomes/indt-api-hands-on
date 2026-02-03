import { Pesquisador } from '@prisma/client'
import { prisma } from '../lib/prisma-client'
import {
  CreatePesquisadorDTO,
  UpdatePesquisadorDTO,
} from '../TDO/researcher.tdo'

export const SalvarPesquisadorModel = async (
  data: CreatePesquisadorDTO,
): Promise<Pesquisador> => {
  return prisma.pesquisador.create({ data })
}

export const ListarPesquisadoresModel = async (): Promise<Pesquisador[]> => {
  return prisma.pesquisador.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const RecuperarPesquisadorPorIdModel = async (
  id: string,
): Promise<Pesquisador | null> => {
  return prisma.pesquisador.findUnique({
    where: { id },
  })
}

export const AtualizarPesquisadorModel = async (
  id: string,
  data: UpdatePesquisadorDTO,
): Promise<Pesquisador> => {
  return prisma.pesquisador.update({
    where: { id },
    data,
  })
}

export const BuscarPesquisadorPorEmailModel = async (
  email: string,
): Promise<Pesquisador | null> => {
  return prisma.pesquisador.findUnique({
    where: { email },
  })
}

export const BuscarPesquisadorPorMatriculaModel = async (matricula: string) => {
  return prisma.pesquisador.findUnique({
    where: { matricula },
  })
}

export const DeletarPesquisadorModel = async (
  id: string,
): Promise<Pesquisador> => {
  return prisma.pesquisador.delete({
    where: { id },
  })
}
