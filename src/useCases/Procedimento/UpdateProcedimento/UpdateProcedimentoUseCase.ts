import { IProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { IUpdateProcedimentoDTO } from './UpdateProcedimentoDTO'

export interface IUpdateProcedimentoUseCase {
  execute(id: string, data: IUpdateProcedimentoDTO): Promise<void>
}

export class UpdateProcedimentoUseCase implements IUpdateProcedimentoUseCase {
  constructor (private procedimentosRepository: IProcedimentosRepository) {}

  async execute (id: string, data: IUpdateProcedimentoDTO) {
    await this.procedimentosRepository.update(id, data)
  }
}
