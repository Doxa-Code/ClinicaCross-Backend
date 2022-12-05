import { Procedimento } from '../../../entities/Procedimento'
import { IProcedimentosRepository } from '../../../repositories/ProcedimentosRepository'
import { ICreateProcedimentoDTO } from './CreateProcedimentoDTO'

export interface ICreateProcedimentoUseCase {
  execute(data: ICreateProcedimentoDTO): Promise<Procedimento>
}

export class CreateProcedimentoUseCase implements ICreateProcedimentoUseCase {
  constructor (private procedimentosRepository: IProcedimentosRepository) {}

  async execute (data: ICreateProcedimentoDTO) {
    const procedimentoDTO = new Procedimento(data)
    const procedimento = await this.procedimentosRepository.save(procedimentoDTO)
    if (!procedimento) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    return procedimento
  }
}
