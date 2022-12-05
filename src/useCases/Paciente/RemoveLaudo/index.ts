import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { RemoveLaudoUseCase } from './RemoveLaudoUseCase'
import { RemoveLaudoController } from './RemoveLaudoController'

const pacientesRepository = new PacienteRepository()
const removeLaudoUseCase = new RemoveLaudoUseCase(pacientesRepository)
const removeLaudoController = new RemoveLaudoController(removeLaudoUseCase)

export { removeLaudoController }
