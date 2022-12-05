import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { GetAllAgendamentoUseCase } from './GetAllAgendamentoUseCase'
import { GetAllAgendamentoController } from './GetAllAgendamentoController'

const agendamentosRepository = new AgendamentosRepository()
const getAllAgendamentoUseCase = new GetAllAgendamentoUseCase(agendamentosRepository)
const getAllAgendamentoController = new GetAllAgendamentoController(getAllAgendamentoUseCase)

export { getAllAgendamentoController }
