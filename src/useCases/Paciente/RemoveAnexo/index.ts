import { S3 } from "aws-sdk";
import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { RemoveAnexoUseCase } from './RemoveAnexoUseCase'
import { RemoveAnexoController } from './RemoveAnexoController'

const pacientesRepository = new PacienteRepository()
const storage = new S3()
const removeAnexoUseCase = new RemoveAnexoUseCase(pacientesRepository, storage)
const removeAnexoController = new RemoveAnexoController(removeAnexoUseCase)

export { removeAnexoController }
