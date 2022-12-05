import { MedicoDocument } from "../../../schemas/MedicoSchema";
import { Medico } from "../../../entities/Medico";
import { CreateMedicoDTO } from "./CreateMedicoDTO";
import { IMedicoRepository } from "../../../repositories/MedicoRepository";

export interface ICreateMedicoUseCase {
  execute(data: CreateMedicoDTO): Promise<MedicoDocument>
}

export class CreateMedicoUseCase implements ICreateMedicoUseCase {
  constructor(private medicoRepository: IMedicoRepository) {}
  
  async execute(data: CreateMedicoDTO) {
    const medicoDTO = new Medico(data)
    const medico = await this.medicoRepository.save(medicoDTO)

    return medico
  }
}