import { Agendamento } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { ICreateAgendamentoDTO } from './CreateAgendamentoDTO'

export interface ICreateAgendamentoUseCase {
  execute(data: ICreateAgendamentoDTO): Promise<{ agendamentos: Agendamento[], agendamento: Agendamento }>
}

export class CreateAgendamentoUseCase implements ICreateAgendamentoUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute (data: ICreateAgendamentoDTO) {
    const agendamentoDTO = new Agendamento(data)
    const reponse = await this.agendamentosRepository.save(agendamentoDTO)
    if (!reponse) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    const agendamento = await this.agendamentosRepository.getOne(reponse._id)
    if(!agendamento) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    const agendamentos = await this.agendamentosRepository.getAll()
    return {agendamentos, agendamento}
  }
}
