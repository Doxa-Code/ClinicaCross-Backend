import { FormaDePagamentosRepository } from '../../../repositories/FormaDePagamentosRepository'
import { GetAllFormaDePagamentoUseCase } from './GetAllFormaDePagamentoUseCase'
import { GetAllFormaDePagamentoController } from './GetAllFormaDePagamentoController'

const formadepagamentosRepository = new FormaDePagamentosRepository()
const getAllFormaDePagamentoUseCase = new GetAllFormaDePagamentoUseCase(formadepagamentosRepository)
const getAllFormaDePagamentoController = new GetAllFormaDePagamentoController(getAllFormaDePagamentoUseCase)

export { getAllFormaDePagamentoController }
