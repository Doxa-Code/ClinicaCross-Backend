import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { IDeleteAgendamentoDTO } from './DeleteAgendamentoDTO'

export interface IDeleteAgendamentoUseCase {
  execute(data: IDeleteAgendamentoDTO): Promise<void>
}

export class DeleteAgendamentoUseCase implements IDeleteAgendamentoUseCase {
  constructor (private AgendamentosRepository: IAgendamentosRepository) {}

  async execute (data: IDeleteAgendamentoDTO) {
    const response = await this.AgendamentosRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
