import { DeleteConvenioDTO } from "./DeleteConvenioDTO";
import { IConvenioRepository } from "../../../repositories/ConvenioRepository";

export interface IDeleteConvenioUseCase {
  execute(query: DeleteConvenioDTO): Promise<void>
}

export class DeleteConvenioUseCase implements IDeleteConvenioUseCase {
  constructor(private convenioRepository: IConvenioRepository){}

  async execute(query: DeleteConvenioDTO) {
    await this.convenioRepository.delete(query);
  }
}