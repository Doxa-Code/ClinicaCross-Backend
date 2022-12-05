import { DeleteUnidadeMedidaDTO } from "./DeleteUnidadeMedidaDTO";
import { IUnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";

export interface IDeleteUnidadeMedidaUseCase {
  execute(query: DeleteUnidadeMedidaDTO): Promise<void>
}

export class DeleteUnidadeMedidaUseCase implements IDeleteUnidadeMedidaUseCase {
  constructor(private unidadeMedidaRepository: IUnidadeMedidaRepository){}

  async execute(query: DeleteUnidadeMedidaDTO) {
    await this.unidadeMedidaRepository.delete(query);
  }
}