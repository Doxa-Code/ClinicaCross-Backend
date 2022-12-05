import { UnidadeMedidaDocument } from "../../../schemas/UnidadeMedidaSchema";
import { UnidadeMedida } from "../../../entities/UnidadeMedida";
import { CreateUnidadeMedidaDTO } from "./CreateUnidadeMedidaDTO";
import { IUnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";

export interface ICreateUnidadeMedidaUseCase {
  execute(data: CreateUnidadeMedidaDTO): Promise<UnidadeMedidaDocument>
}

export class CreateUnidadeMedidaUseCase implements ICreateUnidadeMedidaUseCase {
  constructor(private unidadeMedidaRepository: IUnidadeMedidaRepository) {}
  
  async execute(data: CreateUnidadeMedidaDTO) {
    const unidadeMedidaDTO = new UnidadeMedida(data)
    const unidadeMedida = await this.unidadeMedidaRepository.save(unidadeMedidaDTO)

    return unidadeMedida
  }
}