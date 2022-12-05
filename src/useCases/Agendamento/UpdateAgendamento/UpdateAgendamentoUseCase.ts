import { Agendamento } from "./../../../entities/Agendamento";
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { IUpdateAgendamentoDTO } from './UpdateAgendamentoDTO'

export interface IUpdateAgendamentoUseCase {
  execute(id: string, data: IUpdateAgendamentoDTO): Promise<Agendamento[]>
}

export class UpdateAgendamentoUseCase implements IUpdateAgendamentoUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (id: string, data: IUpdateAgendamentoDTO | any) {
    await this.agendamentosRepository.update(id, data)
    const agendamentos = await this.agendamentosRepository.getAll()
    return agendamentos
  }
}
