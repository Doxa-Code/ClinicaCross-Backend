import { MedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { GetAllMedicamentoUseCase } from './GetAllMedicamentoUseCase'
import { GetAllMedicamentoController } from './GetAllMedicamentoController'

const medicamentosRepository = new MedicamentosRepository()
const getAllMedicamentoUseCase = new GetAllMedicamentoUseCase(medicamentosRepository)
const getAllMedicamentoController = new GetAllMedicamentoController(getAllMedicamentoUseCase)

export { getAllMedicamentoController }
