import { ProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { DeleteProcedimentoUseCase } from './DeleteProcedimentoUseCase'
import { DeleteProcedimentoController } from './DeleteProcedimentoController'

const procedimentosRepository = new ProcedimentosRepository()
const deleteProcedimentoUseCase = new DeleteProcedimentoUseCase(procedimentosRepository)
const deleteProcedimentoController = new DeleteProcedimentoController(deleteProcedimentoUseCase)

export { deleteProcedimentoController }
