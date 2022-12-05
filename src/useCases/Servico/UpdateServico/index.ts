import { UpdateServicoController } from "./UpdateServicoController";
import { UpdateServicoUseCase } from "./UpdateServicoUseCase";
import { ServicoRepository } from "../../../repositories/ServicoRepository";

const servicoRepository = new ServicoRepository();
const updateServicoUseCase = new UpdateServicoUseCase(servicoRepository);
const updateServicoController = new UpdateServicoController(updateServicoUseCase);

export { updateServicoController }