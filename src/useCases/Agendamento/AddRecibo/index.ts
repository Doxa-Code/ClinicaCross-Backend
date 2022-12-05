import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { AddReciboUseCase } from './AddReciboUseCase'
import { AddReciboController } from './AddReciboController'

const agendamentosRepository = new AgendamentosRepository()
const addReciboUseCase = new AddReciboUseCase(agendamentosRepository)
const addReciboController = new AddReciboController(addReciboUseCase)

export { addReciboController }
