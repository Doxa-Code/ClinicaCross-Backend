import { ModeloRepository } from '../../../repositories/ModeloRepository'
import { DeleteModeloUseCase } from './DeleteModeloUseCase'
import { DeleteModeloController } from './DeleteModeloController'

const modelosRepository = new ModeloRepository()
const deleteModeloUseCase = new DeleteModeloUseCase(modelosRepository)
const deleteModeloController = new DeleteModeloController(deleteModeloUseCase)

export { deleteModeloController }
