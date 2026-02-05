import z from 'zod/v4'
import { Titulacoes } from '../enums/titulacao.enum'

export const criarPesquisadorSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(5, 'Nome deve ter pelo menos 5 caracteres'),

  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Formato de email inválido'),

  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),

  matricula: z.string().min(1, 'Matrícula é obrigatória'),

  titulacao: z.enum(Titulacoes, {
    message: 'Titulação inválida',
  }),

  dataNascimento: z.coerce.date().refine(
    (data) => {
      const nascimento = new Date(data)
      const hoje = new Date()

      let idade = hoje.getFullYear() - nascimento.getFullYear()
      const m = hoje.getMonth() - nascimento.getMonth()

      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--
      }

      return idade >= 18
    },
    {
      message: 'Pesquisador deve ter no mínimo 18 anos',
    },
  ),

  especialidade: z.string().optional(),
  linhaPesquisa: z.string().optional(),
})
