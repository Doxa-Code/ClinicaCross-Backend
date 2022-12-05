import { MedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { DeleteMedicamentoUseCase } from './DeleteMedicamentoUseCase'
import { DeleteMedicamentoController } from './DeleteMedicamentoController'

const medicamentosRepository = new MedicamentosRepository()
const deleteMedicamentoUseCase = new DeleteMedicamentoUseCase(medicamentosRepository)
const deleteMedicamentoController = new DeleteMedicamentoController(deleteMedicamentoUseCase)

export { deleteMedicamentoController }
