import { ModeloRepository } from '../../../repositories/ModeloRepository'
import { GetByIdModeloUseCase } from './GetByIdModeloUseCase'
import { GetByIdModeloController } from './GetByIdModeloController'

const modelosRepository = new ModeloRepository()
const getByIdModeloUseCase = new GetByIdModeloUseCase(modelosRepository)
const getByIdModeloController = new GetByIdModeloController(getByIdModeloUseCase)

export { getByIdModeloController }
