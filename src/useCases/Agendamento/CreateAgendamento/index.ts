import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { CreateAgendamentoUseCase } from './CreateAgendamentoUseCase'
import { CreateAgendamentoController } from './CreateAgendamentoController'

const agendamentosRepository = new AgendamentosRepository()
const createAgendamentoUseCase = new CreateAgendamentoUseCase(agendamentosRepository)
const createAgendamentoController = new CreateAgendamentoController(createAgendamentoUseCase)

export { createAgendamentoController }
