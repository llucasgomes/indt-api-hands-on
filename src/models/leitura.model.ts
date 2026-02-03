import { Leitura } from '@prisma/client'
import { prisma } from '../lib/prisma-client'

export const createLeituraModel = (data: any): Promise<Leitura> => {
  return prisma.leitura.create({
    data,
  })
}

export const getAllLeiturasModel = (): Promise<Leitura[]> => {
  return prisma.leitura.findMany({
    include: {
      sensor: true,
    },
    orderBy: {
      dataHora: 'desc',
    },
  })
}

export const getLeituraByIdModel = (id: string): Promise<Leitura | null> => {
  return prisma.leitura.findUnique({
    where: { id },
    include: {
      sensor: true,
    },
  })
}

export const updateLeituraModel = (id: string, data: any): Promise<Leitura> => {
  return prisma.leitura.update({
    where: { id },
    data,
  })
}

export const deleteLeituraModel = (id: string): Promise<Leitura> => {
  return prisma.leitura.delete({
    where: { id },
  })
}
