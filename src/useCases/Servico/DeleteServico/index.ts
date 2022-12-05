import { DeleteServicoUseCase } from "./DeleteServicoUseCase";
import { DeleteServicoController } from "./DeleteServicoController";
import { ServicoRepository } from "../../../repositories/ServicoRepository";


const servicoRepository = new ServicoRepository()
const deleteServicoUseCase = new DeleteServicoUseCase(servicoRepository)
const deleteServicoController = new DeleteServicoController(deleteServicoUseCase)

export { deleteServicoController }