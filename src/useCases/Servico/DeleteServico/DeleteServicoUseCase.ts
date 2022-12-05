import { DeleteServicoDTO } from "./DeleteServicoDTO";
import { IServicoRepository } from "../../../repositories/ServicoRepository";

export interface IDeleteServicoUseCase {
  execute(query: DeleteServicoDTO): Promise<void>
}

export class DeleteServicoUseCase implements IDeleteServicoUseCase {
  constructor(private servicoRepository: IServicoRepository){}

  async execute(query: DeleteServicoDTO) {
    await this.servicoRepository.delete(query);
  }
}