import { Agendamento } from "../../../entities/Agendamento";
import { IAgendamentosRepository } from "../../../repositories/AgendamentosRepository";
import { IGetRelatorioDTO } from "./GetRelatorioDTO";

export interface IGetRelatorioUseCase {
  execute(data: IGetRelatorioDTO): Promise<Agendamento[]>;
}

export class GetRelatorioUseCase implements IGetRelatorioUseCase {
  constructor(private agendamentosRepository: IAgendamentosRepository) {}

  async execute(data: IGetRelatorioDTO) {
    const { dateIn, dateOut, ...query } = data;

    if (dateIn && dateOut) {
      query.inicio = {
        $gte: `${dateIn} 00:00:00`,
        $lte: `${dateOut} 23:59:59`,
      };
    }

    const agendamentos = await this.agendamentosRepository.filter(query);
    if (!agendamentos) return [];
    return agendamentos;
  }
}
