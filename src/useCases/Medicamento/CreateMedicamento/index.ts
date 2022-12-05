import { MedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { CreateMedicamentoUseCase } from './CreateMedicamentoUseCase'
import { CreateMedicamentoController } from './CreateMedicamentoController'

const medicamentosRepository = new MedicamentosRepository()
const createMedicamentoUseCase = new CreateMedicamentoUseCase(medicamentosRepository)
const createMedicamentoController = new CreateMedicamentoController(createMedicamentoUseCase)

export { createMedicamentoController }
