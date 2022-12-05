import { IFormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { IUpdateFormaDePagamentoDTO } from './UpdateFormaDePagamentoDTO'

export interface IUpdateFormaDePagamentoUseCase {
  execute(id: string, data: IUpdateFormaDePagamentoDTO): Promise<void>
}

export class UpdateFormaDePagamentoUseCase implements IUpdateFormaDePagamentoUseCase {
  constructor (private formadepagamentosRepository: IFormaDePagamentosRepository) {}

  async execute (id: string, data: IUpdateFormaDePagamentoDTO) {
    const response = await this.formadepagamentosRepository.update(id, data)
    if (!response) throw new Error('Houve um erro ao processar a alteração! Tente novamente mais tarde!')
  }
}
