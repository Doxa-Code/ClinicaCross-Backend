import { UnidadeMedidaDocument } from "../../../schemas/UnidadeMedidaSchema";
import { FilterQuery } from "mongoose";
import { UnidadeMedida } from "../../../entities/UnidadeMedida";
import { UpdateUnidadeMedidaDTO } from "./UpdateUnidadeMedidaDTO";
import { IUnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";

export interface IUpdateUnidadeMedidaUseCase {
  execute(data: UpdateUnidadeMedidaDTO, query: FilterQuery<UnidadeMedidaDocument>): Promise<void>
}

export class UpdateUnidadeMedidaUseCase implements IUpdateUnidadeMedidaUseCase {
  constructor(private unidadeMedidaRepository: IUnidadeMedidaRepository) {}
  
  async execute(data: UpdateUnidadeMedidaDTO, query: FilterQuery<UnidadeMedidaDocument>) {
    const unidadeMedidaDTO = new UnidadeMedida(data)
    await this.unidadeMedidaRepository.update(unidadeMedidaDTO, query)
  }
}