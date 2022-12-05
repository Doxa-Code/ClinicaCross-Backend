import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { GetAllFaturarUseCase } from './GetAllFaturarUseCase'
import { GetAllFaturarController } from './GetAllFaturarController'

const agendamentosRepository = new AgendamentosRepository()
const getAllFaturarUseCase = new GetAllFaturarUseCase(agendamentosRepository)
const getAllFaturarController = new GetAllFaturarController(getAllFaturarUseCase)

export { getAllFaturarController }
