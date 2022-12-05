import { AgendamentosRepository } from "./../../../repositories/AgendamentosRepository";
import { GetHistoricoUseCase } from "./GetHistoricoUseCase";
import { GetHistoricoController } from "./GetHistoricoController";


const agendamentosRepository = new AgendamentosRepository()
const getHistoricoUseCase = new GetHistoricoUseCase(agendamentosRepository)
const getHistoricoController = new GetHistoricoController(getHistoricoUseCase)

export { getHistoricoController }