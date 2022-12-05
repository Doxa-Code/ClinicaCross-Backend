import { FormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { DeleteFormaDePagamentoUseCase } from './DeleteFormaDePagamentoUseCase'
import { DeleteFormaDePagamentoController } from './DeleteFormaDePagamentoController'

const formadepagamentosRepository = new FormaDePagamentosRepository()
const deleteFormaDePagamentoUseCase = new DeleteFormaDePagamentoUseCase(formadepagamentosRepository)
const deleteFormaDePagamentoController = new DeleteFormaDePagamentoController(deleteFormaDePagamentoUseCase)

export { deleteFormaDePagamentoController }
