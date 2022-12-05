import { Paciente } from "../../../entities/Paciente";
import { CreatePacienteDTO } from "./CreatePacienteDTO";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";

export interface ICreatePacienteUseCase {
  execute(data: CreatePacienteDTO): Promise<Paciente>
}

export class CreatePacienteUseCase implements ICreatePacienteUseCase {
  constructor(private PacienteRepository: IPacienteRepository) {}
  
  async execute(data: CreatePacienteDTO) {
    const pacienteDTO = new Paciente(data)
    const paciente = await this.PacienteRepository.save(pacienteDTO)

    return paciente
  }
}