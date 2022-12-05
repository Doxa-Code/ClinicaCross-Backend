import { Medicamento } from '../../../entities/Medicamento'
import { IMedicamentosRepository } from '../../../repositories/MedicamentosRepository'

export interface IGetAllMedicamentoUseCase {
  execute(): Promise<Omit<Medicamento, 'password'>[]>
}

export class GetAllMedicamentoUseCase implements IGetAllMedicamentoUseCase {
  constructor (private medicamentosRepository: IMedicamentosRepository) {}

  async execute () {
    const medicamentos = await this.medicamentosRepository.getAll()
    if (!medicamentos) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return medicamentos
  }
}
