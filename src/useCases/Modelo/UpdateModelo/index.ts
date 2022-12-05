import { ModeloRepository } from '../../../repositories/ModeloRepository'
import { UpdateModeloUseCase } from './UpdateModeloUseCase'
import { UpdateModeloController } from './UpdateModeloController'

const modelosRepository = new ModeloRepository()
const updateModeloUseCase = new UpdateModeloUseCase(modelosRepository)
const updateModeloController = new UpdateModeloController(updateModeloUseCase)

export { updateModeloController }
