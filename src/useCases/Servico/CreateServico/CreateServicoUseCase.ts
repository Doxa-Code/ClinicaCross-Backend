import { ServicoDocument } from "../../../schemas/ServicoSchema";
import { Servico } from "../../../entities/Servico";
import { CreateServicoDTO } from "./CreateServicoDTO";
import { IServicoRepository } from "../../../repositories/ServicoRepository";

export interface ICreateServicoUseCase {
  execute(data: CreateServicoDTO): Promise<ServicoDocument>
}

export class CreateServicoUseCase implements ICreateServicoUseCase {
  constructor(private servicoRepository: IServicoRepository) {}
  
  async execute(data: CreateServicoDTO) {
    const servicoDTO = new Servico(data)
    const servico = await this.servicoRepository.save(servicoDTO)

    return servico
  }
}