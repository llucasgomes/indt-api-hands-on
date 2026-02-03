export interface CreatePesquisadorDTO {
  name: string
  email: string
  password: string
  titulacao: string
  matricula: string
  dataNascimento: Date
  especialidade?: string
  linhaPesquisa?: string
}

export interface UpdatePesquisadorDTO {
  name?: string
  email?: string
  password?: string
  titulacao?: string
  matricula?: string
  dataNascimento?: Date
  especialidade?: string
  linhaPesquisa?: string
}
