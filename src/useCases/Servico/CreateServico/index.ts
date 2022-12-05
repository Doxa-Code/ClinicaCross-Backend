import { CreateServicoController } from "./CreateServicoController";
import { CreateServicoUseCase } from "./CreateServicoUseCase";
import { ServicoRepository } from "../../../repositories/ServicoRepository";

const servicoRepository = new ServicoRepository();
const createServicoUseCase = new CreateServicoUseCase(servicoRepository);
const createServicoController = new CreateServicoController(createServicoUseCase);

export { createServicoController }