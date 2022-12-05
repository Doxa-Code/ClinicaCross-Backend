import { PacienteRepository } from "../../../repositories/PacienteRepository";
import { RemovePedidoUseCase } from "./RemovePedidoUseCase";
import { RemovePedidoController } from "./RemovePedidoController";

const pacientesRepository = new PacienteRepository();
const removePedidoUseCase = new RemovePedidoUseCase(pacientesRepository);
const removePedidoController = new RemovePedidoController(removePedidoUseCase);

export { removePedidoController };
