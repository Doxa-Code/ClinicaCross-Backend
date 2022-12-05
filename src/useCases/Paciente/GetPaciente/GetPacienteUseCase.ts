import { PacienteDocument } from "../../../schemas/PacienteSchema";
import { GetPacienteDTO } from "./GetPacienteDTO";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";

export interface IGetPacienteUseCase {
  execute(query: GetPacienteDTO): Promise<PacienteDocument | {}>
}

export class GetPacienteUseCase implements IGetPacienteUseCase {
  constructor(private PacienteRepository: IPacienteRepository){}

  async execute(query: GetPacienteDTO) {
    const paciente = await this.PacienteRepository.show(query);
    if(!paciente) return {}
    return paciente
  }
}