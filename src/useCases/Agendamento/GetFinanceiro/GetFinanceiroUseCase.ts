import { Agendamento } from '../../../entities/Agendamento'
import { IAgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { IGetFinanceiroDTO } from './GetFinanceiroDTO'

export interface IGetFinanceiroUseCase {
  execute(data: IGetFinanceiroDTO): Promise<Agendamento[]>
}

export class GetFinanceiroUseCase implements IGetFinanceiroUseCase {
  constructor (private agendamentosRepository: IAgendamentosRepository) {}

  async execute(data: IGetFinanceiroDTO) {
    const { dateIn, dateOut, ...query } = data

    if(dateIn && dateOut) {
      query['pagamento.dataVencimento'] = {
        $gte: `${dateIn} 00:00:00`,
        $lte: `${dateOut} 23:59:59`
      }
    }

    
    const agendamentos = await this.agendamentosRepository.filter(query)
    if(!agendamentos) return []
    return agendamentos
  }
}
