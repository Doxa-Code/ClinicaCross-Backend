import { FormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { CreateFormaDePagamentoUseCase } from './CreateFormaDePagamentoUseCase'
import { CreateFormaDePagamentoController } from './CreateFormaDePagamentoController'

const formadepagamentosRepository = new FormaDePagamentosRepository()
const createFormaDePagamentoUseCase = new CreateFormaDePagamentoUseCase(formadepagamentosRepository)
const createFormaDePagamentoController = new CreateFormaDePagamentoController(createFormaDePagamentoUseCase)

export { createFormaDePagamentoController }
