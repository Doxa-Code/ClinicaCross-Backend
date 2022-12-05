import { PacienteDocument } from "../../../schemas/PacienteSchema";
import { GetPacienteUploaderDTO } from "./GetPacienteUploaderDTO";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";

export interface IGetPacienteUploaderUseCase {
  execute(query: GetPacienteUploaderDTO): Promise<PacienteDocument | {}>;
}

export class GetPacienteUploaderUseCase implements IGetPacienteUploaderUseCase {
  constructor(private PacienteRepository: IPacienteRepository) {}

  async execute(query: GetPacienteUploaderDTO) {
    const paciente = await this.PacienteRepository.show(query);
    if (!paciente) return {};
    return paciente;
  }
}
