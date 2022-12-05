import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { GetFinanceiroUseCase } from './GetFinanceiroUseCase'
import { GetFinanceiroController } from './GetFinanceiroController'

const agendamentosRepository = new AgendamentosRepository()
const getFinanceiroUseCase = new GetFinanceiroUseCase(agendamentosRepository)
const getFinanceiroController = new GetFinanceiroController(getFinanceiroUseCase)

export { getFinanceiroController }
