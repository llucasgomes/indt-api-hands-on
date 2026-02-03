import { Area } from '@prisma/client'
import { prisma } from '../lib/prisma-client'

export const createAreaModel = (data: any): Promise<Area> => {
  return prisma.area.create({ data })
}

export const getAllAreasModel = (): Promise<Area[]> => {
  return prisma.area.findMany()
}

export const getAreaByIdModel = (id: string): Promise<Area | null> => {
  return prisma.area.findUnique({ where: { id } })
}

export const updateAreaModel = (id: string, data: any): Promise<Area> => {
  return prisma.area.update({
    where: { id },
    data,
  })
}

export const deleteAreaModel = (id: string): Promise<Area> => {
  return prisma.area.delete({ where: { id } })
}

export const getAreaByNameModel = (nome: string) => {
  return prisma.area.findFirst({
    where: { nome },
  })
}
