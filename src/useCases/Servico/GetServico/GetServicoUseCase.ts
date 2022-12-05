import { ServicoDocument } from "../../../schemas/ServicoSchema";
import { GetServicoDTO } from "./GetServicoDTO";
import { IServicoRepository } from "../../../repositories/ServicoRepository";

export interface IGetServicoUseCase {
  execute(query: GetServicoDTO): Promise<ServicoDocument | {}>
}

export class GetServicoUseCase implements IGetServicoUseCase {
  constructor(private servicoRepository: IServicoRepository){}

  async execute(query: GetServicoDTO) {
    const servico = await this.servicoRepository.show(query);
    if(!servico) return {}
    return servico
  }
}