import { isBefore, parseISO } from "date-fns";
import { Agendamento } from "../../../entities/Agendamento";
import { IAgendamentosRepository } from "../../../repositories/AgendamentosRepository";

export interface IGetByIdAgendamentoUseCase {
  execute(id: string): Promise<Agendamento>;
}

export class GetByIdAgendamentoUseCase implements IGetByIdAgendamentoUseCase {
  constructor(private agendamentosRepository: IAgendamentosRepository) {}

  async execute(id: string) {
    const agendamento = await this.agendamentosRepository.getOne(id);
    if (!agendamento) {
      throw new Error(
        "Houve um erro ao buscar os dados! Tente novamente mais tarde!"
      );
    }
    const historico = await this.agendamentosRepository.getAllFilter({
      paciente: agendamento.paciente?._id,
      _id: { $ne: agendamento._id },
    });
    return {
      ...agendamento,
      historico: historico.filter((agenda) =>
        isBefore(parseISO(agenda.inicio), parseISO(agendamento.inicio))
      ),
    };
  }
}
