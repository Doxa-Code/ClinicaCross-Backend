import { FormaDePagamento } from '../../../entities/FormaDePagamento'
import { IFormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'

export interface IGetByIdFormaDePagamentoUseCase {
  execute(id: string): Promise<FormaDePagamento>
}

export class GetByIdFormaDePagamentoUseCase implements IGetByIdFormaDePagamentoUseCase {
  constructor (private formadepagamentosRepository: IFormaDePagamentosRepository) {}

  async execute (id: string) {
    const formadepagamento = await this.formadepagamentosRepository.getOne(id)
    if (!formadepagamento) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return formadepagamento
  }
}
