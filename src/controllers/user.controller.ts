import { FastifyInstance } from 'fastify'
import z from 'zod/v4'
import {
  atualizarUserService,
  deletarUserService,
  listarUserService,
  recuperarUmUserService,
  salvarUserService,
} from '../services/user.service'

export default async function userController(server: FastifyInstance) {
  /**
   * Criar User
   */
  server.post(
    '/users',
    {
      schema: {
        description: 'Cria um novo usuário',
        tags: ['User'],
        body: z.object({
          name: z.string().min(5, 'Nome deve ter pelo menos 5 caracteres'),
          email: z.email('Email inválido'),
          gender: z.string().min(1, 'Gênero é obrigatório'),
          password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
        }),
        response: {
          201: z
            .object({
              id: z.uuid(),
              name: z.string().min(5),
              email: z.email(),
              gender: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .describe('Usuário criado com sucesso'),
          400: z
            .object({
              message: z.string(),
            })
            .describe('Requisição inválida'),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Conflito de dados'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Erro interno do servidor'),
        },
      },
    },
    salvarUserService,
  )

  // /**
  //  * Listar Users
  //  */
  server.get(
    '/users',
    {
      schema: {
        description: 'Lista todos os usuários',
        tags: ['User'],
        response: {
          200: z
            .array(
              z.object({
                id: z.uuid(),
                name: z.string().min(5),
                email: z.email(),
                gender: z.string().min(1),
                status: z.enum(['ACTIVE', 'INACTIVE']),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            )
            .describe('Lista de usuários'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Erro interno do servidor'),
        },
      },
    },
    listarUserService,
  )

  // /**
  //  * Buscar User por ID
  //  */
  server.get(
    '/users/:id',
    {
      schema: {
        description: 'Busca um usuário pelo ID',
        tags: ['User'],
        params: z.object({
          id: z.string().uuid('ID inválido'),
        }),
        response: {
          200: z
            .object({
              id: z.string().uuid(),
              name: z.string().min(5),
              email: z.string().email(),
              gender: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .describe('Usuário encontrado'),
          404: z
            .object({
              message: z.string(),
            })
            .describe('Usuário não encontrado'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Erro interno do servidor'),
        },
      },
    },
    recuperarUmUserService,
  )

  // /**
  //  * Atualizar User
  //  */
  server.put(
    '/users/:id',
    {
      schema: {
        description: 'Atualiza um usuário',
        tags: ['User'],
        params: z.object({
          id: z.string().uuid('ID inválido'),
        }),
        body: z.object({
          name: z.string().min(5).optional(),
          email: z.string().email().optional(),
          gender: z.string().min(1).optional(),
          password: z.string().min(6).optional(),
          status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
        }),
        response: {
          200: z
            .object({
              id: z.string().uuid(),
              name: z.string().min(5),
              email: z.string().email(),
              gender: z.string().min(1),
              status: z.enum(['ACTIVE', 'INACTIVE']),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .describe('Usuário atualizado'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Erro interno do servidor'),
        },
      },
    },
    atualizarUserService,
  )

  // /**
  //  * Deletar User (soft delete)
  //  */
  server.delete(
    '/users/:id',
    {
      schema: {
        description: 'Inativa um usuário (soft delete)',
        tags: ['User'],
        params: z.object({
          id: z.string().uuid('ID inválido'),
        }),
        response: {
          204: z.null().describe('Deletado com sucesso.Nenhum conteúdo'),
          500: z
            .object({
              message: z.string(),
            })
            .describe('Erro interno do servidor'),
        },
      },
    },
    deletarUserService,
  )
}
