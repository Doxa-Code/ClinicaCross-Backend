import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddReceitaUseCase } from './AddReceitaUseCase'
import { AddReceitaController } from './AddReceitaController'

const pacientesRepository = new PacienteRepository()
const addReceitaUseCase = new AddReceitaUseCase(pacientesRepository)
const addReceitaController = new AddReceitaController(addReceitaUseCase)

export { addReceitaController }
