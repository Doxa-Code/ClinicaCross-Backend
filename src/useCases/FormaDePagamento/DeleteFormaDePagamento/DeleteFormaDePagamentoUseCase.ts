import { IFormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { IDeleteFormaDePagamentoDTO } from './DeleteFormaDePagamentoDTO'

export interface IDeleteFormaDePagamentoUseCase {
  execute(data: IDeleteFormaDePagamentoDTO): Promise<void>
}

export class DeleteFormaDePagamentoUseCase implements IDeleteFormaDePagamentoUseCase {
  constructor (private FormaDePagamentosRepository: IFormaDePagamentosRepository) {}

  async execute (data: IDeleteFormaDePagamentoDTO) {
    const response = await this.FormaDePagamentosRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
