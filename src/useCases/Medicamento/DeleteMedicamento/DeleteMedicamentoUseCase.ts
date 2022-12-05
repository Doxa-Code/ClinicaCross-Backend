import { IMedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { IDeleteMedicamentoDTO } from './DeleteMedicamentoDTO'

export interface IDeleteMedicamentoUseCase {
  execute(data: IDeleteMedicamentoDTO): Promise<void>
}

export class DeleteMedicamentoUseCase implements IDeleteMedicamentoUseCase {
  constructor (private MedicamentosRepository: IMedicamentosRepository) {}

  async execute (data: IDeleteMedicamentoDTO) {
    const response = await this.MedicamentosRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
