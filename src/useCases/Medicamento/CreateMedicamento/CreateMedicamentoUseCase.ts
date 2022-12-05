import { Medicamento } from '../../../entities/Medicamento'
import { IMedicamentosRepository } from '../../../repositories/MedicamentosRepository'
import { ICreateMedicamentoDTO } from './CreateMedicamentoDTO'

export interface ICreateMedicamentoUseCase {
  execute(data: ICreateMedicamentoDTO): Promise<Medicamento>
}

export class CreateMedicamentoUseCase implements ICreateMedicamentoUseCase {
  constructor (private medicamentosRepository: IMedicamentosRepository) {}

  async execute (data: ICreateMedicamentoDTO) {
    const medicamentoDTO = new Medicamento(data)
    const medicamento = await this.medicamentosRepository.save(medicamentoDTO)
    if (!medicamento) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    return medicamento
  }
}
