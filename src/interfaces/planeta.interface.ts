export interface IPlanetaData {
    id?: number
    planeta?: string
    apelido?: string
    user?: {
      name: string
    }
  }



export interface IPlanetaForm {
  id?: number
  title?: string
  planeta?: string
  created_at?: string
  topic?: number[] | undefined
}