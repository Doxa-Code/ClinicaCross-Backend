import { MedicoDocument } from "../../../schemas/MedicoSchema";
import { FilterQuery } from "mongoose";
import { Medico } from "../../../entities/Medico";
import { UpdateMedicoDTO } from "./UpdateMedicoDTO";
import { IMedicoRepository } from "../../../repositories/MedicoRepository";

export interface IUpdateMedicoUseCase {
  execute(data: UpdateMedicoDTO, query: FilterQuery<MedicoDocument>): Promise<Medico>
}

export class UpdateMedicoUseCase implements IUpdateMedicoUseCase {
  constructor(private medicoRepository: IMedicoRepository) {}
  
  async execute(data: UpdateMedicoDTO, query: FilterQuery<MedicoDocument>) {
    const medicoDTO = new Medico(data)
    await this.medicoRepository.update(medicoDTO, query)
    const medico = await this.medicoRepository.show(query)
    if(!medico) throw new Error('Medico não encontrado')
    return medico
  }
}