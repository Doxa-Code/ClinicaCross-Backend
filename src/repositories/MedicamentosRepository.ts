import MedicamentoModel from '../schemas/MedicamentoSchema'
import { Medicamento } from '../entities/Medicamento'

export interface IMedicamentosRepository {
  save(data: Medicamento): Promise<Medicamento>
  getAll(): Promise<Medicamento[]>
  getOne(id: string): Promise<Medicamento | null>
  update(id: string, data: Medicamento): Promise<Boolean>
  delete(id: string): Promise<Boolean>
}

export class MedicamentosRepository implements IMedicamentosRepository {
  async save (data: Medicamento) {
    const response = await MedicamentoModel.create(data)
    return response.toObject()
  }

  async getAll () {
    return await MedicamentoModel.find()
  }

  async getOne (id: string) {
    const medicamento = await MedicamentoModel.findById(id)
    if (!medicamento) return null
    return medicamento?.toObject()
  }

  async update (id: string, data: Medicamento) {
    const response = await MedicamentoModel.updateOne({ _id: id }, { $set: data })
    return response.nModified > 0
  }

  async delete (id: string) {
    const { deletedCount } = await MedicamentoModel.deleteOne({ _id: id })
    if (!deletedCount) return false
    return deletedCount > 0
  }
}
