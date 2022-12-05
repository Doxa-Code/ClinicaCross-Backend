import { IPacienteRepository } from "../../../repositories/PacienteRepository";
import { Paciente } from "../../../entities/Paciente";

export interface ISearchPacienteUseCase {
  execute(
    query: string,
    limit: number,
    page: number,
    noCount: boolean
  ): Promise<{
    pacientes: Paciente[] | [];
    totalPages: number;
    currentPage: number;
  }>;
}

export class SearchPacienteUseCase implements ISearchPacienteUseCase {
  constructor(private PacienteRepository: IPacienteRepository) {}

  async execute(query: string, limit: number, page: number, noCount: boolean) {
    const filter = {
      $or: [
        { codigo: { $regex: query, $options: "im" } },
        { nome: { $regex: query, $options: "im" } },
        { whatsapp: { $regex: query, $options: "im" } },
        { numeroCarteira: { $regex: query, $options: "im" } },
      ],
    };
    const pacientes = await this.PacienteRepository.search(filter, limit, page);
    const count = noCount
      ? 0
      : await this.PacienteRepository.countDocuments(filter);
    const totalPages = noCount ? 0 : Math.ceil(count || 10 / limit);

    return {
      pacientes,
      totalPages,
      currentPage: page,
    };
  }
}
