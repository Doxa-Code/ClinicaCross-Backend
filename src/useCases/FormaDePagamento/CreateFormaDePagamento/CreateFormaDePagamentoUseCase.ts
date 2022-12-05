import { FormaDePagamento } from '../../../entities/FormaDePagamento'
import { IFormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { ICreateFormaDePagamentoDTO } from './CreateFormaDePagamentoDTO'

export interface ICreateFormaDePagamentoUseCase {
  execute(data: ICreateFormaDePagamentoDTO): Promise<FormaDePagamento>
}

export class CreateFormaDePagamentoUseCase implements ICreateFormaDePagamentoUseCase {
  constructor (private formadepagamentosRepository: IFormaDePagamentosRepository) {}

  async execute (data: ICreateFormaDePagamentoDTO) {
    const formadepagamentoDTO = new FormaDePagamento(data)
    const formadepagamento = await this.formadepagamentosRepository.save(formadepagamentoDTO)
    if (!formadepagamento) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    return formadepagamento
  }
}
