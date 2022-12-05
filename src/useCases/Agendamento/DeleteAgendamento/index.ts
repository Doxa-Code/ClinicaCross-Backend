import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { DeleteAgendamentoUseCase } from './DeleteAgendamentoUseCase'
import { DeleteAgendamentoController } from './DeleteAgendamentoController'

const agendamentosRepository = new AgendamentosRepository()
const deleteAgendamentoUseCase = new DeleteAgendamentoUseCase(agendamentosRepository)
const deleteAgendamentoController = new DeleteAgendamentoController(deleteAgendamentoUseCase)

export { deleteAgendamentoController }
