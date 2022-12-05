import { DeleteMedicoDTO } from "./DeleteMedicoDTO";
import { IMedicoRepository } from "../../../repositories/MedicoRepository";

export interface IDeleteMedicoUseCase {
  execute(query: DeleteMedicoDTO): Promise<void>
}

export class DeleteMedicoUseCase implements IDeleteMedicoUseCase {
  constructor(private medicoRepository: IMedicoRepository){}

  async execute(query: DeleteMedicoDTO) {
    await this.medicoRepository.delete(query);
  }
}