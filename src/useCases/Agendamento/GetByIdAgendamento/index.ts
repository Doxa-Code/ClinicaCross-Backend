import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { GetByIdAgendamentoUseCase } from './GetByIdAgendamentoUseCase'
import { GetByIdAgendamentoController } from './GetByIdAgendamentoController'

const agendamentosRepository = new AgendamentosRepository()
const getByIdAgendamentoUseCase = new GetByIdAgendamentoUseCase(agendamentosRepository)
const getByIdAgendamentoController = new GetByIdAgendamentoController(getByIdAgendamentoUseCase)

export { getByIdAgendamentoController }
