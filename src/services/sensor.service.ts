import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createSensorModel,
  deleteSensorModel,
  getAllSensorsModel,
  getSensorByIdModel,
  getSensorBySerialModel,
  updateSensorModel,
} from '../models/sensor.model'
import { CreateSensorDTO } from '../TDO/create-sensor.dto'

export const createSensorService = async (
  req: FastifyRequest<{ Body: CreateSensorDTO }>,
  reply: FastifyReply,
) => {
  try {
    const { serialNumber, status } = req.body

    const sensorExiste = await getSensorBySerialModel(serialNumber)
    if (sensorExiste) {
      return reply.status(409).send({
        message: 'SerialNumber já cadastrado',
      })
    }

    const data = {
      ...req.body,
      dataManutencao: status === 'MANUTENCAO' ? new Date() : undefined,
    }

    const sensor = await createSensorModel(data)
    return reply.status(201).send(sensor)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro interno do servidor',
    })
  }
}

export const getAllSensorsService = async (
  _req: FastifyRequest,
  reply: FastifyReply,
) => {
  const sensors = await getAllSensorsModel()
  return reply.send(sensors)
}

export const getSensorByIdService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }

  const sensor = await getSensorByIdModel(id)
  if (!sensor) {
    return reply.status(404).send({ message: 'Sensor não encontrado' })
  }

  return reply.send(sensor)
}

export const updateSensorService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  const sensor = await updateSensorModel(id, req.body)
  return reply.send(sensor)
}

export const deleteSensorService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  await deleteSensorModel(id)
  return reply.status(204).send()
}
