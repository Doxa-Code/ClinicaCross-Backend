import { IMedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { IUpdateMedicamentoDTO } from './UpdateMedicamentoDTO'

export interface IUpdateMedicamentoUseCase {
  execute(id: string, data: IUpdateMedicamentoDTO): Promise<void>
}

export class UpdateMedicamentoUseCase implements IUpdateMedicamentoUseCase {
  constructor (private medicamentosRepository: IMedicamentosRepository) {}

  async execute (id: string, data: IUpdateMedicamentoDTO) {
    await this.medicamentosRepository.update(id, data)
  }
}
