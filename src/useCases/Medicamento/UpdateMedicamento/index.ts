import { MedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { UpdateMedicamentoUseCase } from './UpdateMedicamentoUseCase'
import { UpdateMedicamentoController } from './UpdateMedicamentoController'

const medicamentosRepository = new MedicamentosRepository()
const updateMedicamentoUseCase = new UpdateMedicamentoUseCase(medicamentosRepository)
const updateMedicamentoController = new UpdateMedicamentoController(updateMedicamentoUseCase)

export { updateMedicamentoController }
