import { Recibo } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { IAddReciboDTO } from './AddReciboDTO'

export interface IAddReciboUseCase {
  execute(data: IAddReciboDTO, agendamentoId: string): Promise<Recibo[]>
}

export class AddReciboUseCase implements IAddReciboUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (data: IAddReciboDTO, agendamentoId: string) {
    const reciboDTO = new Recibo(data)
    const response = await this.agendamentosRepository.addRecibo(reciboDTO, agendamentoId)
    if(!response) throw new Error('Não foi possível adicionar o recibo')
    
    const agendamento = await this.agendamentosRepository.getOne(agendamentoId)
    if(!agendamento) throw new Error('Não foi possível encontrar o agendamento')

    return agendamento.recibo
  }
}
