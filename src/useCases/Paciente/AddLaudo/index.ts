import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddLaudoUseCase } from './AddLaudoUseCase'
import { AddLaudoController } from './AddLaudoController'

const pacientesRepository = new PacienteRepository()
const addLaudoUseCase = new AddLaudoUseCase(pacientesRepository)
const addLaudoController = new AddLaudoController(addLaudoUseCase)

export { addLaudoController }
