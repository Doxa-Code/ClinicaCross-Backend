import { Pagamento } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { IUpdatePagamentoDTO } from './UpdatePagamentoDTO'

export interface IUpdatePagamentoUseCase {
  execute(data: IUpdatePagamentoDTO, agendamentoId: string, id: string): Promise<Pagamento[]>
}

export class UpdatePagamentoUseCase implements IUpdatePagamentoUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (data: IUpdatePagamentoDTO, agendamentoId: string, id:string) {
    const pagamentoDTO = new Pagamento(data)
    const response = await this.agendamentosRepository.updatePagamento(pagamentoDTO, agendamentoId, id)
    if(!response) throw new Error('Houve um erro ao processar a alteração! Tente novamente mais tarde!')

    const agendamento = await this.agendamentosRepository.getOne(agendamentoId)
    if(!agendamento) throw new Error('Houve um erro ao processar a alteração! Tente novamente mais tarde!')
    
    return agendamento.pagamento
  }
}
