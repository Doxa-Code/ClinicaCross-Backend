import { ServicoDocument } from "../../../schemas/ServicoSchema";
import { FilterQuery } from "mongoose";
import { Servico } from "../../../entities/Servico";
import { UpdateServicoDTO } from "./UpdateServicoDTO";
import { IServicoRepository } from "../../../repositories/ServicoRepository";

export interface IUpdateServicoUseCase {
  execute(data: UpdateServicoDTO, query: FilterQuery<ServicoDocument>): Promise<void>
}

export class UpdateServicoUseCase implements IUpdateServicoUseCase {
  constructor(private servicoRepository: IServicoRepository) {}
  
  async execute(data: UpdateServicoDTO, query: FilterQuery<ServicoDocument>) {
    const ServicoDTO = new Servico(data)
    await this.servicoRepository.update(ServicoDTO, query)
  }
}