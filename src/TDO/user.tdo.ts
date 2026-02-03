export type CreateUserDTO = {
  name: string
  email: string
  gender: string
  password: string
}

export type UpdateUserDTO = {
  name?: string
  email?: string
  gender?: string
  password?: string
  status?: string
}
