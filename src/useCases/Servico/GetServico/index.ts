import { GetServicoUseCase } from "./GetServicoUseCase";
import { GetServicoController } from "./GetServicoController";
import { ServicoRepository } from "../../../repositories/ServicoRepository";


const servicoRepository = new ServicoRepository()
const getServicoUseCase = new GetServicoUseCase(servicoRepository)
const getServicoController = new GetServicoController(getServicoUseCase)

export { getServicoController }