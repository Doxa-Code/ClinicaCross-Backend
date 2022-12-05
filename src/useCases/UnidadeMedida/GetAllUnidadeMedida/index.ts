import { GetAllUnidadeMedidaUseCase } from "./GetAllUnidadeMedidaUseCase";
import { GetAllUnidadeMedidaController } from "./GetAllUnidadeMedidaController";
import { UnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";


const unidadeMedidaRepository = new UnidadeMedidaRepository()
const getAllUnidadeMedidaUseCase = new GetAllUnidadeMedidaUseCase(unidadeMedidaRepository)
const getAllUnidadeMedidaController = new GetAllUnidadeMedidaController(getAllUnidadeMedidaUseCase)

export { getAllUnidadeMedidaController }