import { SensorStatus } from '@prisma/client'

export interface CreateSensorDTO {
  serialNumber: string
  fabricante: string
  modelo: string
  tipo: string
  status: SensorStatus
  ipFixo?: string
  dataInstalacao: Date
  dataManutencao?: Date
  cicloLeitura: number
  latitude: number
  longitude: number
  finalidade?: string
  areaId: string
}
