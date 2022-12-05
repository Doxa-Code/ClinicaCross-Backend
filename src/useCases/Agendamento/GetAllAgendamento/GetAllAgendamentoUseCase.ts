import { isBefore, parseISO } from "date-fns";
import { Agendamento } from "../../../entities/Agendamento";
import { IAgendamentosRepository } from "../../../repositories/AgendamentosRepository";

export interface IGetAllAgendamentoUseCase {
  execute(
    linked: string | boolean,
    day?: string,
    end?: string
  ): Promise<Agendamento[]>;
}

export class GetAllAgendamentoUseCase implements IGetAllAgendamentoUseCase {
  constructor(private agendamentosRepository: IAgendamentosRepository) {}

  async execute(linked: string | boolean, day: string, end?: string) {
    const agendamentos = await this.agendamentosRepository.getAll(
      linked,
      day,
      end
    );
    if (!agendamentos) {
      throw new Error(
        "Houve um erro ao buscar os dados! Tente novamente mais tarde!"
      );
    }
    return agendamentos.map((agendamento) => {
      return {
        ...agendamento,
        historico: agendamentos
          .filter(
            (agenda) =>
              agenda.paciente?._id?.toString() ===
              agendamento.paciente?._id?.toString()
          )
          .filter(
            (agenda) => agenda._id.toString() !== agendamento._id.toString()
          )
          .filter((agenda) =>
            isBefore(parseISO(agenda.inicio), parseISO(agendamento.inicio))
          ),
      };
    });
  }
}
