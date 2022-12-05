import FormaDePagamentoModel from '../schemas/FormaDePagamentoSchema'
import { FormaDePagamento } from '../entities/FormaDePagamento'

export interface IFormaDePagamentosRepository {
  save(data: FormaDePagamento): Promise<FormaDePagamento>
  getAll(): Promise<FormaDePagamento[]>
  getOne(id: string): Promise<FormaDePagamento | null>
  update(id: string, data: FormaDePagamento): Promise<Boolean>
  delete(id: string): Promise<Boolean>
}

export class FormaDePagamentosRepository implements IFormaDePagamentosRepository {
  async save (data: FormaDePagamento) {
    const response = await FormaDePagamentoModel.create(data)
    return response.toObject()
  }

  async getAll () {
    return await FormaDePagamentoModel.find()
  }

  async getOne (id: string) {
    const formadepagamento = await FormaDePagamentoModel.findById(id)
    if (!formadepagamento) return null
    return formadepagamento?.toObject()
  }

  async update (id: string, data: FormaDePagamento) {
    const response = await FormaDePagamentoModel.updateOne({ _id: id }, { $set: data })
    return response.nModified > 0
  }

  async delete (id: string) {
    const { deletedCount } = await FormaDePagamentoModel.deleteOne({ _id: id })
    if (!deletedCount) return false
    return deletedCount > 0
  }
}
