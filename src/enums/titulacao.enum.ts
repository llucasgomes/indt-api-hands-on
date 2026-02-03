export const Titulacoes = [
  'Graduação',
  'Especialização',
  'Mestrado',
  'Doutorado',
] as const

export type Titulacao = (typeof Titulacoes)[number]
