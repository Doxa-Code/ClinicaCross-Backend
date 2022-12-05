import { ModeloRepository } from '../../../repositories/ModeloRepository'
import { CreateModeloUseCase } from './CreateModeloUseCase'
import { CreateModeloController } from './CreateModeloController'

const modelosRepository = new ModeloRepository()
const createModeloUseCase = new CreateModeloUseCase(modelosRepository)
const createModeloController = new CreateModeloController(createModeloUseCase)

export { createModeloController }
