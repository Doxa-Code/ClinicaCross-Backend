import { FormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { GetByIdFormaDePagamentoUseCase } from './GetByIdFormaDePagamentoUseCase'
import { GetByIdFormaDePagamentoController } from './GetByIdFormaDePagamentoController'

const formadepagamentosRepository = new FormaDePagamentosRepository()
const getByIdFormaDePagamentoUseCase = new GetByIdFormaDePagamentoUseCase(formadepagamentosRepository)
const getByIdFormaDePagamentoController = new GetByIdFormaDePagamentoController(getByIdFormaDePagamentoUseCase)

export { getByIdFormaDePagamentoController }
