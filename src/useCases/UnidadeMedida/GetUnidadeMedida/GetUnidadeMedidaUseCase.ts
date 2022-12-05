import { UnidadeMedidaDocument } from "../../../schemas/UnidadeMedidaSchema";
import { GetUnidadeMedidaDTO } from "./GetUnidadeMedidaDTO";
import { IUnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";

export interface IGetUnidadeMedidaUseCase {
  execute(query: GetUnidadeMedidaDTO): Promise<UnidadeMedidaDocument | {}>
}

export class GetUnidadeMedidaUseCase implements IGetUnidadeMedidaUseCase {
  constructor(private unidadeMedidaRepository: IUnidadeMedidaRepository){}

  async execute(query: GetUnidadeMedidaDTO) {
    const unidadeMedida = await this.unidadeMedidaRepository.show(query);
    if(!unidadeMedida) return {}
    return unidadeMedida
  }
}