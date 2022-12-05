import { Procedimento } from '../../../entities/Procedimento'
import { IProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'

export interface IGetByIdProcedimentoUseCase {
  execute(id: string): Promise<Procedimento>
}

export class GetByIdProcedimentoUseCase implements IGetByIdProcedimentoUseCase {
  constructor (private procedimentosRepository: IProcedimentosRepository) {}

  async execute (id: string) {
    const procedimento = await this.procedimentosRepository.getOne(id)
    if (!procedimento) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return procedimento
  }
}
