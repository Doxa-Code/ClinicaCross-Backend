import { Procedimento } from '../../../entities/Procedimento'
import { IProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'

export interface IGetAllProcedimentoUseCase {
  execute(): Promise<Omit<Procedimento, 'password'>[]>
}

export class GetAllProcedimentoUseCase implements IGetAllProcedimentoUseCase {
  constructor (private procedimentosRepository: IProcedimentosRepository) {}

  async execute () {
    const procedimentos = await this.procedimentosRepository.getAll()
    if (!procedimentos) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return procedimentos
  }
}
