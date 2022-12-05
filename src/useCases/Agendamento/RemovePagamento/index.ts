import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { RemovePagamentoUseCase } from './RemovePagamentoUseCase'
import { RemovePagamentoController } from './RemovePagamentoController'

const agendamentosRepository = new AgendamentosRepository()
const removePagamentoUseCase = new RemovePagamentoUseCase(agendamentosRepository)
const removePagamentoController = new RemovePagamentoController(removePagamentoUseCase)

export { removePagamentoController }
