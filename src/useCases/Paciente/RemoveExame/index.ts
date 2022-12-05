import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { RemoveExameUseCase } from './RemoveExameUseCase'
import { RemoveExameController } from './RemoveExameController'

const pacientesRepository = new PacienteRepository()
const removeExameUseCase = new RemoveExameUseCase(pacientesRepository)
const removeExameController = new RemoveExameController(removeExameUseCase)

export { removeExameController }
