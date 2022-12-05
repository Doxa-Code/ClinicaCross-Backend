import { AgendamentoDocument } from "./../../../schemas/AgendamentoSchema";
import { FilterQuery } from "mongoose";
import { Agendamento } from "../../../entities/Agendamento";
import { IAgendamentosRepository } from "../../../repositories/AgendamentosRepository";

export interface IGetSearchAgendamentoUseCase {
  execute(query: FilterQuery<AgendamentoDocument>): Promise<Agendamento[]>;
}

export class GetSearchAgendamentoUseCase
  implements IGetSearchAgendamentoUseCase
{
  constructor(private agendamentosRepository: IAgendamentosRepository) {}

  async execute(query: FilterQuery<AgendamentoDocument>) {
    const agendamentos = await this.agendamentosRepository.getAllFilter(query);
    if (!agendamentos) {
      throw new Error(
        "Houve um erro ao buscar os dados! Tente novamente mais tarde!"
      );
    }
    return agendamentos;
  }
}
