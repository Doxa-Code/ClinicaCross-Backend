import { IGruposRepository } from '../../../repositories/GruposRepository'
import { IDeleteGrupoDTO } from './DeleteGrupoDTO'

export interface IDeleteGrupoUseCase {
  execute(data: IDeleteGrupoDTO): Promise<void>
}

export class DeleteGrupoUseCase implements IDeleteGrupoUseCase {
  constructor (private GruposRepository: IGruposRepository) {}

  async execute (data: IDeleteGrupoDTO) {
    const response = await this.GruposRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
