import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddAtestadoUseCase } from './AddAtestadoUseCase'
import { AddAtestadoController } from './AddAtestadoController'

const pacientesRepository = new PacienteRepository()
const addAtestadoUseCase = new AddAtestadoUseCase(pacientesRepository)
const addAtestadoController = new AddAtestadoController(addAtestadoUseCase)

export { addAtestadoController }
