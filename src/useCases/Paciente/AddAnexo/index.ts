import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddAnexoUseCase } from './AddAnexoUseCase'
import { AddAnexoController } from './AddAnexoController'

const pacientesRepository = new PacienteRepository()
const addAnexoUseCase = new AddAnexoUseCase(pacientesRepository)
const addAnexoController = new AddAnexoController(addAnexoUseCase)

export { addAnexoController }
