import { FastifyReply, FastifyRequest } from 'fastify'
import {
  createAreaModel,
  deleteAreaModel,
  getAllAreasModel,
  getAreaByIdModel,
  getAreaByNameModel,
  updateAreaModel,
} from '../models/area.model'

export const createAreaService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { nome } = req.body as { nome: string }

  const areaExiste = await getAreaByNameModel(nome)
  if (areaExiste) {
    return reply.status(409).send({
      message: 'Já existe uma área com esse nome',
    })
  }

  const area = await createAreaModel(req.body)
  return reply.status(201).send(area)
}

export const getAllAreasService = async (
  _req: FastifyRequest,
  reply: FastifyReply,
) => {
  const areas = await getAllAreasModel()
  return reply.send(areas)
}

export const getAreaByIdService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }

  const area = await getAreaByIdModel(id)
  if (!area) {
    return reply.status(404).send({ message: 'Área não encontrada' })
  }

  return reply.send(area)
}

export const updateAreaService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  const area = await updateAreaModel(id, req.body)
  return reply.send(area)
}

export const deleteAreaService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  await deleteAreaModel(id)
  return reply.status(204).send()
}
