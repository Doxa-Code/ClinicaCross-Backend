import { AgendamentosRepository } from '../../../repositories/AgendamentosRepository'
import { AddPagamentoUseCase } from './AddPagamentoUseCase'
import { AddPagamentoController } from './AddPagamentoController'

const agendamentosRepository = new AgendamentosRepository()
const addPagamentoUseCase = new AddPagamentoUseCase(agendamentosRepository)
const addPagamentoController = new AddPagamentoController(addPagamentoUseCase)

export { addPagamentoController }
