import { GetAllServicoUseCase } from "./GetAllServicoUseCase";
import { GetAllServicoController } from "./GetAllServicoController";
import { ServicoRepository } from "../../../repositories/ServicoRepository";


const servicoRepository = new ServicoRepository()
const getAllServicoUseCase = new GetAllServicoUseCase(servicoRepository)
const getAllServicoController = new GetAllServicoController(getAllServicoUseCase)

export { getAllServicoController }