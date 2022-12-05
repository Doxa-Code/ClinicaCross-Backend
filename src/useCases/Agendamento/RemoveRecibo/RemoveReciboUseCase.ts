import { Recibo } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'

export interface IRemoveReciboUseCase {
  execute(id: string, agendamentoId: string): Promise<Recibo[]>
}

export class RemoveReciboUseCase implements IRemoveReciboUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (id: string, agendamentoId: string) {
    const response = await this.agendamentosRepository.removeRecibo(id, agendamentoId)
    if (!response) throw new Error('Não foi possível remover o recibo')
    
    const agendamento = await this.agendamentosRepository.getOne(agendamentoId)
    if(!agendamento) throw new Error('Não foi possível encontrar o agendamento')
    
    return agendamento?.recibo
  }
}
