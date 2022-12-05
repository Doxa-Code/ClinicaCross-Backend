import { Declaracao } from "../../../entities/Paciente";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";
import { IAddDeclaracaoDTO } from "./AddDeclaracaoDTO";

export interface IAddDeclaracaoUseCase {
  execute(data: IAddDeclaracaoDTO, pacienteId: string): Promise<Declaracao[]>;
}

export class AddDeclaracaoUseCase implements IAddDeclaracaoUseCase {
  constructor(private pacienteRepository: IPacienteRepository) {}

  async execute(data: IAddDeclaracaoDTO, pacienteId: string) {
    const declaracaoDTO = new Declaracao(data);

    const response = await this.pacienteRepository.addDeclaracao(
      declaracaoDTO,
      pacienteId
    );
    if (!response) throw new Error("Não foi possível adicionar o declaracao");

    const paciente = await this.pacienteRepository.show({ _id: pacienteId });
    if (!paciente) throw new Error("Não foi possível encontrar o paciente");

    return paciente.declaracao;
  }
}
