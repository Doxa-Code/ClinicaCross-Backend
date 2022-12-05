import { Agendamento } from "../../../entities/Agendamento";
import { IAgendamentosRepository } from "../../../repositories/AgendamentosRepository";

export interface IGetHistoricoUseCase {
  execute(pacienteId: string): Promise<Agendamento[]>
}

export class GetHistoricoUseCase implements IGetHistoricoUseCase {
  constructor(private agendamentosRepository: IAgendamentosRepository){}

  async execute(pacienteId: string) {
    const agendamentos = await this.agendamentosRepository.getHistory(pacienteId)
    return agendamentos
  }
}