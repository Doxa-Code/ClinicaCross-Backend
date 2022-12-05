import { MedicoDocument } from "../../../schemas/MedicoSchema";
import { GetMedicoUploaderDTO } from "./GetMedicoUploaderDTO";
import { IMedicoRepository } from "../../../repositories/MedicoRepository";

export interface IGetMedicoUploaderUseCase {
  execute(query: GetMedicoUploaderDTO): Promise<MedicoDocument | {}>;
}

export class GetMedicoUploaderUseCase implements IGetMedicoUploaderUseCase {
  constructor(private medicoRepository: IMedicoRepository) {}

  async execute(query: GetMedicoUploaderDTO) {
    const medico = await this.medicoRepository.show(query);
    if (!medico) return {};
    return medico;
  }
}
