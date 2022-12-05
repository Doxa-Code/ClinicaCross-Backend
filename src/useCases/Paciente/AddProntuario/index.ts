import { PacienteRepository } from '../../../repositories/PacienteRepository'
import { AddProntuarioUseCase } from './AddProntuarioUseCase'
import { AddProntuarioController } from './AddProntuarioController'

const pacientesRepository = new PacienteRepository()
const addProntuarioUseCase = new AddProntuarioUseCase(pacientesRepository)
const addProntuarioController = new AddProntuarioController(addProntuarioUseCase)

export { addProntuarioController }
