import { Pagamento } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { IAddPagamentoDTO } from './AddPagamentoDTO'

export interface IAddPagamentoUseCase {
  execute(data: IAddPagamentoDTO, agendamentoId: string): Promise<Pagamento[]>
}

export class AddPagamentoUseCase implements IAddPagamentoUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (data: IAddPagamentoDTO, agendamentoId: string) {
    const pagamentoDTO = new Pagamento(data)
    const response = await this.agendamentosRepository.addPagamento(pagamentoDTO, agendamentoId)
    if(!response) throw new Error('Não foi possível adicionar o pagamento')

    const agendamento = await this.agendamentosRepository.getOne(agendamentoId)
    if(!agendamento) throw new Error('Não foi possível encontrar o agendamento')

    return agendamento.pagamento
  }
}
