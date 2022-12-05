import { DeleteUnidadeMedidaUseCase } from "./DeleteUnidadeMedidaUseCase";
import { DeleteUnidadeMedidaController } from "./DeleteUnidadeMedidaController";
import { UnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";


const unidadeMedidaRepository = new UnidadeMedidaRepository()
const deleteUnidadeMedidaUseCase = new DeleteUnidadeMedidaUseCase(unidadeMedidaRepository)
const deleteUnidadeMedidaController = new DeleteUnidadeMedidaController(deleteUnidadeMedidaUseCase)

export { deleteUnidadeMedidaController }