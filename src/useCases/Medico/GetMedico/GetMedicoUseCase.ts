import { MedicoDocument } from "../../../schemas/MedicoSchema";
import { GetMedicoDTO } from "./GetMedicoDTO";
import { IMedicoRepository } from "../../../repositories/MedicoRepository";

export interface IGetMedicoUseCase {
  execute(query: GetMedicoDTO): Promise<MedicoDocument | {}>
}

export class GetMedicoUseCase implements IGetMedicoUseCase {
  constructor(private medicoRepository: IMedicoRepository){}

  async execute(query: GetMedicoDTO) {
    const medico = await this.medicoRepository.show(query);
    if(!medico) return {}
    return medico
  }
}