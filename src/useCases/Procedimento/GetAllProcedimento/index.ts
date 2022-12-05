import { ProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { GetAllProcedimentoUseCase } from './GetAllProcedimentoUseCase'
import { GetAllProcedimentoController } from './GetAllProcedimentoController'

const procedimentosRepository = new ProcedimentosRepository()
const getAllProcedimentoUseCase = new GetAllProcedimentoUseCase(procedimentosRepository)
const getAllProcedimentoController = new GetAllProcedimentoController(getAllProcedimentoUseCase)

export { getAllProcedimentoController }
