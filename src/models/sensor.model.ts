import { Sensor } from '@prisma/client'
import { prisma } from '../lib/prisma-client'

export const createSensorModel = (data: any): Promise<Sensor> => {
  return prisma.sensor.create({ data })
}

export const getAllSensorsModel = (): Promise<Sensor[]> => {
  return prisma.sensor.findMany({
    include: { area: true },
  })
}

export const getSensorByIdModel = (id: string): Promise<Sensor | null> => {
  return prisma.sensor.findUnique({
    where: { id },
    include: { area: true },
  })
}

export const updateSensorModel = (id: string, data: any): Promise<Sensor> => {
  return prisma.sensor.update({
    where: { id },
    data,
  })
}

export const deleteSensorModel = (id: string): Promise<Sensor> => {
  return prisma.sensor.delete({ where: { id } })
}

export const getSensorBySerialModel = (serialNumber: string) => {
  return prisma.sensor.findUnique({
    where: { serialNumber },
  })
}
