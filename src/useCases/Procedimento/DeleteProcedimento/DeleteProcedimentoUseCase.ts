import { IProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { IDeleteProcedimentoDTO } from './DeleteProcedimentoDTO'

export interface IDeleteProcedimentoUseCase {
  execute(data: IDeleteProcedimentoDTO): Promise<void>
}

export class DeleteProcedimentoUseCase implements IDeleteProcedimentoUseCase {
  constructor (private ProcedimentosRepository: IProcedimentosRepository) {}

  async execute (data: IDeleteProcedimentoDTO) {
    const response = await this.ProcedimentosRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
