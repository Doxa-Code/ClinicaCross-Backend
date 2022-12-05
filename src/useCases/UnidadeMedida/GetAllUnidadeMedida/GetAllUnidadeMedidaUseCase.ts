import { IUnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";
import { UnidadeMedida } from "../../../entities/UnidadeMedida";

export interface IGetAllUnidadeMedidaUseCase {
  execute(): Promise<UnidadeMedida[] | []>
}

export class GetAllUnidadeMedidaUseCase implements IGetAllUnidadeMedidaUseCase {
  constructor(private unidadeMedidaRepository: IUnidadeMedidaRepository){}

  async execute() {
    const unidadeMedidas = await this.unidadeMedidaRepository.index();
    return unidadeMedidas
  }
}