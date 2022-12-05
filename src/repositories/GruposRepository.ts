import GrupoModel from '../schemas/GrupoSchema'
import { Grupo } from '../entities/Grupo'

export interface IGruposRepository {
  save(data: Grupo): Promise<Grupo>
  getAll(): Promise<Grupo[]>
  getOne(id: string): Promise<Grupo | null>
  update(id: string, data: Grupo): Promise<Boolean>
  delete(id: string): Promise<Boolean>
}

export class GruposRepository implements IGruposRepository {
  async save (data: Grupo) {
    const response = await GrupoModel.create(data)
    return response.toObject()
  }

  async getAll () {
    return await GrupoModel.find()
  }

  async getOne (id: string) {
    const grupo = await GrupoModel.findById(id)
    if (!grupo) return null
    return grupo?.toObject()
  }

  async update (id: string, data: Grupo) {
    const response = await GrupoModel.updateOne({ _id: id }, { $set: data })
    return response.nModified > 0
  }

  async delete (id: string) {
    const { deletedCount } = await GrupoModel.deleteOne({ _id: id })
    if (!deletedCount) return false
    return deletedCount > 0
  }
}
