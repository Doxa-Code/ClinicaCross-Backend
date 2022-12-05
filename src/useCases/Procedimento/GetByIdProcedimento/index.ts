import { ProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { GetByIdProcedimentoUseCase } from './GetByIdProcedimentoUseCase'
import { GetByIdProcedimentoController } from './GetByIdProcedimentoController'

const procedimentosRepository = new ProcedimentosRepository()
const getByIdProcedimentoUseCase = new GetByIdProcedimentoUseCase(procedimentosRepository)
const getByIdProcedimentoController = new GetByIdProcedimentoController(getByIdProcedimentoUseCase)

export { getByIdProcedimentoController }
