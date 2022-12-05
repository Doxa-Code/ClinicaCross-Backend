import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { GetRelatorioUseCase } from './GetRelatorioUseCase'
import { GetRelatorioController } from './GetRelatorioController'

const agendamentosRepository = new AgendamentosRepository()
const getRelatorioUseCase = new GetRelatorioUseCase(agendamentosRepository)
const getRelatorioController = new GetRelatorioController(getRelatorioUseCase)

export { getRelatorioController }
