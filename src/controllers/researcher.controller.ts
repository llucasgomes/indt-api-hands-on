import { FastifyInstance } from 'fastify'
import z from 'zod/v4'
import { validarCriacaoPesquisador } from '../middlewares/validarPesquisador.middleware'
import {
  atualizarPesquisadorService,
  deletarPesquisadorService,
  listarPesquisadoresService,
  recuperarPesquisadorService,
  salvarPesquisadorService,
} from '../services/researcher.service'

export default async function pesquisadorController(server: FastifyInstance) {
  server.post(
    '/pesquisadores',
    {
      preHandler: validarCriacaoPesquisador,
      schema: {
        description: 'Cria um novo pesquisador',
        tags: ['Pesquisador'],
        body: z.object({
          name: z.string().min(5),
          email: z.email(),
          password: z.string().min(6),
          titulacao: z.string(),
          matricula: z.string(),
          dataNascimento: z.coerce.date(),
          especialidade: z.string().min(1, 'Especialidade é obrigatória'),
          linhaPesquisa: z.string().optional(),
        }),
        response: {
          201: z
            .object({
              id: z.uuid(),
              name: z.string(),
              email: z.email(),
              titulacao: z.string(),
              matricula: z.string(),
              especialidade: z.string().nullable(),
              linhaPesquisa: z.string().nullable(),
              dataNascimento: z.date(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .describe('Pesquisador criado com sucesso'),
        },
      },
    },
    salvarPesquisadorService,
  )

  server.get(
    '/pesquisadores',
    {
      schema: {
        description: 'Lista pesquisadores',
        tags: ['Pesquisador'],
        response: {
          200: z
            .array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.email(),
              }),
            )
            .describe('Lista de pesquisadores'),
        },
      },
    },
    listarPesquisadoresService,
  )

  server.get(
    '/pesquisadores/:id',
    {
      schema: {
        description: 'Busca pesquisador por ID',
        tags: ['Pesquisador'],
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    recuperarPesquisadorService,
  )

  server.put(
    '/pesquisadores/:id',
    {
      schema: {
        description: 'Atualiza pesquisador',
        tags: ['Pesquisador'],
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().optional(),
          email: z.email().optional(),
          password: z.string().min(6).optional(),
          titulacao: z.string().optional(),
          especialidade: z.string().optional(),
          linhaPesquisa: z.string().optional(),
        }),
      },
    },
    atualizarPesquisadorService,
  )

  server.delete(
    '/pesquisadores/:id',
    {
      schema: {
        description: 'Deleta um pesquisador',
        tags: ['Pesquisador'],
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    deletarPesquisadorService,
  )
}
