import { ProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { UpdateProcedimentoUseCase } from './UpdateProcedimentoUseCase'
import { UpdateProcedimentoController } from './UpdateProcedimentoController'

const procedimentosRepository = new ProcedimentosRepository()
const updateProcedimentoUseCase = new UpdateProcedimentoUseCase(procedimentosRepository)
const updateProcedimentoController = new UpdateProcedimentoController(updateProcedimentoUseCase)

export { updateProcedimentoController }
