import { CreateUnidadeMedidaController } from "./CreateUnidadeMedidaController";
import { CreateUnidadeMedidaUseCase } from "./CreateUnidadeMedidaUseCase";
import { UnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";

const unidadeMedidaRepository = new UnidadeMedidaRepository();
const createUnidadeMedidaUseCase = new CreateUnidadeMedidaUseCase(unidadeMedidaRepository);
const createUnidadeMedidaController = new CreateUnidadeMedidaController(createUnidadeMedidaUseCase);

export { createUnidadeMedidaController }