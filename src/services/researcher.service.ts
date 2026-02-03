import { FastifyReply, FastifyRequest } from 'fastify'
import {
  AtualizarPesquisadorModel,
  BuscarPesquisadorPorEmailModel,
  BuscarPesquisadorPorMatriculaModel,
  DeletarPesquisadorModel,
  ListarPesquisadoresModel,
  RecuperarPesquisadorPorIdModel,
  SalvarPesquisadorModel,
} from '../models/researcher.model'

export const salvarPesquisadorService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const {
      name,
      email,
      password,
      titulacao,
      matricula,
      dataNascimento,
      especialidade,
      linhaPesquisa,
    } = req.body as any

    if (!name || name.length < 5) {
      return reply.status(400).send({ message: 'Nome inválido' })
    }

    if (!email) {
      return reply.status(400).send({ message: 'Email é obrigatório' })
    }

    if (!password || password.length < 6) {
      return reply.status(400).send({ message: 'Senha inválida' })
    }

    const emailExiste = await BuscarPesquisadorPorEmailModel(email)
    if (emailExiste) {
      return reply.status(409).send({
        message: 'E-mail já cadastrado',
      })
    }

    const matriculaExiste = await BuscarPesquisadorPorMatriculaModel(matricula)
    if (matriculaExiste) {
      return reply.status(409).send({
        message: 'Matrícula já cadastrada',
      })
    }

    const pesquisador = await SalvarPesquisadorModel({
      name,
      email,
      password, // depois entra bcrypt
      titulacao,
      matricula,
      dataNascimento: new Date(dataNascimento),
      especialidade,
      linhaPesquisa,
    })

    return reply.status(201).send(pesquisador)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao criar pesquisador',
    })
  }
}

export const listarPesquisadoresService = async (
  _req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const pesquisadores = await ListarPesquisadoresModel()
    return reply.status(200).send(pesquisadores)
  } catch {
    return reply.status(500).send({ message: 'Erro ao listar pesquisadores' })
  }
}

export const recuperarPesquisadorService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }

  const pesquisador = await RecuperarPesquisadorPorIdModel(id)

  if (!pesquisador) {
    return reply.status(404).send({ message: 'Pesquisador não encontrado' })
  }

  return reply.status(200).send(pesquisador)
}

export const atualizarPesquisadorService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = req.params as { id: string }
  const data = req.body as any

  const pesquisador = await AtualizarPesquisadorModel(id, data)
  return reply.status(200).send(pesquisador)
}

export const deletarPesquisadorService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = req.params as { id: string }

    const pesquisadorExiste = await RecuperarPesquisadorPorIdModel(id)

    if (!pesquisadorExiste) {
      return reply.status(404).send({
        message: 'Pesquisador não encontrado',
      })
    }

    await DeletarPesquisadorModel(id)

    return reply.status(204).send()
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao deletar pesquisador',
    })
  }
}
