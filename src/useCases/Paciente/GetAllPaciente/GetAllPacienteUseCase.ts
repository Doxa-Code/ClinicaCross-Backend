import { IPacienteRepository } from "../../../repositories/PacienteRepository";
import { Paciente } from "../../../entities/Paciente";

export interface IGetAllPacienteUseCase {
  execute(limit: number, page: number): Promise<{ pacientes: Paciente[] | [], totalPages: number, currentPage: number }>
}

export class GetAllPacienteUseCase implements IGetAllPacienteUseCase {
  constructor(private PacienteRepository: IPacienteRepository){}

  async execute(limit: number, page: number) {
    const pacientes = await this.PacienteRepository.index(limit, page);
    const count = await this.PacienteRepository.countDocuments();
    const totalPages = Math.ceil(count || 10 / limit)
    return {
      pacientes,
      totalPages,
      currentPage: page
    }
  }
}