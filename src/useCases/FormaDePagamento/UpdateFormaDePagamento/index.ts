import { FormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { UpdateFormaDePagamentoUseCase } from './UpdateFormaDePagamentoUseCase'
import { UpdateFormaDePagamentoController } from './UpdateFormaDePagamentoController'

const formadepagamentosRepository = new FormaDePagamentosRepository()
const updateFormaDePagamentoUseCase = new UpdateFormaDePagamentoUseCase(formadepagamentosRepository)
const updateFormaDePagamentoController = new UpdateFormaDePagamentoController(updateFormaDePagamentoUseCase)

export { updateFormaDePagamentoController }
