import { IPlanetaData } from "interfaces/planeta.interface";
import api from "services/api";

class PlanetaData {
  index() {
    return api.get<IPlanetaData[]>('/planetas')
  }
  store(data: IPlanetaData) {
    return api.post(`/planetas`, data)
  }
  show(id: number) {
    return api.get<IPlanetaData>(`/planetas/${id}`)
  }
  update(id: number, data: IPlanetaData) {
    return api.put(`/planetas/${id}`, data)
  }
  destroy(id: number) {
    return api.delete(`/planetas/${id}`)
  }
}

export default new PlanetaData()