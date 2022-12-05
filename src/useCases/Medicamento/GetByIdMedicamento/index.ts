import { MedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { GetByIdMedicamentoUseCase } from './GetByIdMedicamentoUseCase'
import { GetByIdMedicamentoController } from './GetByIdMedicamentoController'

const medicamentosRepository = new MedicamentosRepository()
const getByIdMedicamentoUseCase = new GetByIdMedicamentoUseCase(medicamentosRepository)
const getByIdMedicamentoController = new GetByIdMedicamentoController(getByIdMedicamentoUseCase)

export { getByIdMedicamentoController }
