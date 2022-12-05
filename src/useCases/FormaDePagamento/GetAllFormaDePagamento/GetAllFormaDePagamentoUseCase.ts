import { FormaDePagamento } from '../../../entities/FormaDePagamento'
import { IFormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'

export interface IGetAllFormaDePagamentoUseCase {
  execute(): Promise<Omit<FormaDePagamento, 'password'>[]>
}

export class GetAllFormaDePagamentoUseCase implements IGetAllFormaDePagamentoUseCase {
  constructor (private formadepagamentosRepository: IFormaDePagamentosRepository) {}

  async execute () {
    const formadepagamentos = await this.formadepagamentosRepository.getAll()
    if (!formadepagamentos) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return formadepagamentos
  }
}
