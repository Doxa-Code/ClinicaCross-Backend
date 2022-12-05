import { Pagamento } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'

export interface IRemovePagamentoUseCase {
  execute(id: string, agendamentoId: string): Promise<Pagamento[]>
}

export class RemovePagamentoUseCase implements IRemovePagamentoUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (id: string, agendamentoId: string) {
    const response = await this.agendamentosRepository.removePagamento(id, agendamentoId)
    if (!response) throw new Error('Não foi possível remover o pagamento')
    const agendamento = await this.agendamentosRepository.getOne(agendamentoId)
    if(!agendamento) throw new Error('Não foi possível encontrar o agendamento')
    return agendamento.pagamento
  }
}
