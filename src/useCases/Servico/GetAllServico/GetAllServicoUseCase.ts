import { IServicoRepository } from "../../../repositories/ServicoRepository";
import { Servico } from "../../../entities/Servico";

export interface IGetAllServicoUseCase {
  execute(): Promise<Servico[] | []>
}

export class GetAllServicoUseCase implements IGetAllServicoUseCase {
  constructor(private servicoRepository: IServicoRepository){}

  async execute() {
    const servicos = await this.servicoRepository.index();
    return servicos
  }
}