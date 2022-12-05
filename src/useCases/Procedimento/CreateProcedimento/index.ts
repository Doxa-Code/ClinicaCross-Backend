import { ProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { CreateProcedimentoUseCase } from './CreateProcedimentoUseCase'
import { CreateProcedimentoController } from './CreateProcedimentoController'

const procedimentosRepository = new ProcedimentosRepository()
const createProcedimentoUseCase = new CreateProcedimentoUseCase(procedimentosRepository)
const createProcedimentoController = new CreateProcedimentoController(createProcedimentoUseCase)

export { createProcedimentoController }
