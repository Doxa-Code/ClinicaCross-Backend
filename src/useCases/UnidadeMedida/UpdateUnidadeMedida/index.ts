import { UpdateUnidadeMedidaController } from "./UpdateUnidadeMedidaController";
import { UpdateUnidadeMedidaUseCase } from "./UpdateUnidadeMedidaUseCase";
import { UnidadeMedidaRepository } from "../../../repositories/UnidadeMedidaRepository";

const unidadeMedidaRepository = new UnidadeMedidaRepository();
const updateUnidadeMedidaUseCase = new UpdateUnidadeMedidaUseCase(unidadeMedidaRepository);
const updateUnidadeMedidaController = new UpdateUnidadeMedidaController(updateUnidadeMedidaUseCase);

export { updateUnidadeMedidaController }