import { FastifyReply, FastifyRequest } from 'fastify'
import {
  AtualizarUserModel,
  BuscarUserPorEmailModel,
  DeletarUserModel,
  ListarUserModel,
  RecuperarUmUserModel,
  SalvarUserModel,
} from '../models/user.model'

/**
 * Criar User
 */
export const salvarUserService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { name, email, gender, password } = req.body as {
      name: string
      email: string
      gender: string
      password: string
    }

    if (!name || name.length < 5) {
      reply.status(400).send({ message: 'Nome inválido' })
      return
    }

    if (!email) {
      return reply.status(400).send({ message: 'Email é obrigatório' })
    }

    if (!gender) {
      return reply.status(400).send({ message: 'Gênero é obrigatório' })
    }

    if (!password || password.length < 6) {
      return reply.status(400).send({ message: 'Senha inválida' })
    }

    const emailExiste = await BuscarUserPorEmailModel(email)

    if (emailExiste) {
      return reply.status(409).send({
        message: 'E-mail já cadastrado',
      })
    }

    const user = await SalvarUserModel({
      name,
      email,
      gender,
      password, // depois eu  aplico bcrypt aqui
    })

    return reply.status(201).send(user)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao salvar usuário',
    })
  }
}

/**
 * Listar Users
 */
export const listarUserService = async (
  _req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await ListarUserModel()
    return reply.status(200).send(users)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao listar usuários',
    })
  }
}

/**
 * Buscar User por ID
 */
export const recuperarUmUserService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = req.params as { id: string }

    const user = await RecuperarUmUserModel(id)

    if (!user) {
      return reply.status(404).send({
        message: 'Usuário não encontrado',
      })
    }

    return reply.status(200).send(user)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao buscar usuário',
    })
  }
}

/**
 * Atualizar User
 */
export const atualizarUserService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = req.params as { id: string }
    const data = req.body as any

    const user = await AtualizarUserModel(id, data)
    return reply.status(200).send(user)
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao atualizar usuário',
    })
  }
}

/**
 * Soft delete User
 */
export const deletarUserService = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = req.params as { id: string }

    await DeletarUserModel(id)
    return reply.status(204).send()
  } catch (error) {
    console.error(error)
    return reply.status(500).send({
      message: 'Erro ao deletar usuário',
    })
  }
}
