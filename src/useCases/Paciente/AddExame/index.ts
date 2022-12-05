import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddExameUseCase } from './AddExameUseCase'
import { AddExameController } from './AddExameController'

const pacientesRepository = new PacienteRepository()
const addExameUseCase = new AddExameUseCase(pacientesRepository)
const addExameController = new AddExameController(addExameUseCase)

export { addExameController }
