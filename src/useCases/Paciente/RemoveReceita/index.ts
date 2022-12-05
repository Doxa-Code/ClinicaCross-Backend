import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { RemoveReceitaUseCase } from './RemoveReceitaUseCase'
import { RemoveReceitaController } from './RemoveReceitaController'

const pacientesRepository = new PacienteRepository()
const removeReceitaUseCase = new RemoveReceitaUseCase(pacientesRepository)
const removeReceitaController = new RemoveReceitaController(removeReceitaUseCase)

export { removeReceitaController }
