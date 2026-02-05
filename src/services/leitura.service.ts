import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createLeituraModel,
  deleteLeituraModel,
  getAllLeiturasModel,
  getLeituraByIdModel,
  updateLeituraModel,
} from '../models/leitura.model'

export const createLeituraService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { umidade, temperatura, sensor_id } = req.body as {
      umidade: number
      temperatura: number
      sensor_id: string
    }

    const dataHora = new Date()

    const leitura = await createLeituraModel({
      umidade,
      temperatura,
      sensorId: sensor_id,
      dataHora,
    })

    return reply.status(201).send(leitura)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro interno do servidor',
    })
  }
}

export const getAllLeiturasService = async (
  _req: FastifyRequest,
  reply: FastifyReply,
) => {
  const leituras = await getAllLeiturasModel()
  return reply.send(leituras)
}

export const getLeituraByIdService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }

  const leitura = await getLeituraByIdModel(id)
  if (!leitura) {
    return reply.status(404).send({
      message: 'Leitura não encontrada',
    })
  }

  return reply.send(leitura)
}

export const updateLeituraService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  const leitura = await updateLeituraModel(id, req.body)
  return reply.send(leitura)
}

export const deleteLeituraService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  await deleteLeituraModel(id)
  return reply.status(204).send()
}
