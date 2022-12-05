import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { UpdatePagamentoUseCase } from './UpdatePagamentoUseCase'
import { UpdatePagamentoController } from './UpdatePagamentoController'

const agendamentosRepository = new AgendamentosRepository()
const updatePagamentoUseCase = new UpdatePagamentoUseCase(agendamentosRepository)
const updatePagamentoController = new UpdatePagamentoController(updatePagamentoUseCase)

export { updatePagamentoController }
