import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { RemoveReciboUseCase } from './RemoveReciboUseCase'
import { RemoveReciboController } from './RemoveReciboController'

const agendamentosRepository = new AgendamentosRepository()
const removeReciboUseCase = new RemoveReciboUseCase(agendamentosRepository)
const removeReciboController = new RemoveReciboController(removeReciboUseCase)

export { removeReciboController }
