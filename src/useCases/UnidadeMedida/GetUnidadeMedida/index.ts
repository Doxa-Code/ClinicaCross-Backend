import { GetUnidadeMedidaUseCase } from "./GetUnidadeMedidaUseCase";
import { GetUnidadeMedidaController } from "./GetUnidadeMedidaController";
import { UnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";


const unidadeMedidaRepository = new UnidadeMedidaRepository()
const getUnidadeMedidaUseCase = new GetUnidadeMedidaUseCase(unidadeMedidaRepository)
const getUnidadeMedidaController = new GetUnidadeMedidaController(getUnidadeMedidaUseCase)

export { getUnidadeMedidaController }