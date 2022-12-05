import ProcedimentoModel from '../schemas/ProcedimentoSchema'
import { Procedimento } from '../entities/Procedimento'

export interface IProcedimentosRepository {
  save(data: Procedimento): Promise<Procedimento>
  getAll(): Promise<Procedimento[]>
  getOne(id: string): Promise<Procedimento | null>
  update(id: string, data: Procedimento): Promise<Boolean>
  delete(id: string): Promise<Boolean>
}

export class ProcedimentosRepository implements IProcedimentosRepository {
  async save (data: Procedimento) {
    const response = await ProcedimentoModel.create(data)
    return response.toObject()
  }

  async getAll () {
    return await ProcedimentoModel.find()
  }

  async getOne (id: string) {
    const procedimento = await ProcedimentoModel.findById(id)
    if (!procedimento) return null
    return procedimento?.toObject()
  }

  async update (id: string, data: Procedimento) {
    const response = await ProcedimentoModel.updateOne({ _id: id }, { $set: data })
    return response.nModified > 0
  }

  async delete (id: string) {
    const { deletedCount } = await ProcedimentoModel.deleteOne({ _id: id })
    if (!deletedCount) return false
    return deletedCount > 0
  }
}
