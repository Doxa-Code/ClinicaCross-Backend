import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { UpdateAgendamentoUseCase } from './UpdateAgendamentoUseCase'
import { UpdateAgendamentoController } from './UpdateAgendamentoController'

const agendamentosRepository = new AgendamentosRepository()
const updateAgendamentoUseCase = new UpdateAgendamentoUseCase(agendamentosRepository)
const updateAgendamentoController = new UpdateAgendamentoController(updateAgendamentoUseCase)

export { updateAgendamentoController }
