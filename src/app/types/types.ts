export type User = {
  id?: number
  primeiro_nome: string
  ultimo_nome: string
  email: string
  data_nascimento: string
  estado: string
  cidade: string
  is_admin: boolean | number
}

export type CollectionPoint = {
  nome: string
  endereco: string
  estado: string
  cidade: string
  contato: string
}
