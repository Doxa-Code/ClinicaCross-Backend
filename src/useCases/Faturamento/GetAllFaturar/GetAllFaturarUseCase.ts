import { Agendamento } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'

export interface IGetAllFaturarUseCase {
  execute(): Promise<Agendamento[]>
}

export class GetAllFaturarUseCase implements IGetAllFaturarUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute () {
    const agendamentos = await this.agendamentosRepository.getAllFilter({
      $and: [
        {
          $or: [
            { faturado: false },
            { faturado: { $exists: false } }
          ]
        },
        {
          status: "Realizado"
        }
      ]
    })
    if (!agendamentos) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return agendamentos
  }
}
