import { Medicamento } from '../../../entities/Medicamento'
import { IMedicamentosRepository } from '../../../repositories/MedicamentosRepository'

export interface IGetByIdMedicamentoUseCase {
  execute(id: string): Promise<Medicamento>
}

export class GetByIdMedicamentoUseCase implements IGetByIdMedicamentoUseCase {
  constructor (private medicamentosRepository: IMedicamentosRepository) {}

  async execute (id: string) {
    const medicamento = await this.medicamentosRepository.getOne(id)
    if (!medicamento) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return medicamento
  }
}
