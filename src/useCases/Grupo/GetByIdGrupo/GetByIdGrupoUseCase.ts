import { Grupo } from '../../../entities/Grupo'
import { IGruposRepository } from '../../../repositories/GruposRepository'

export interface IGetByIdGrupoUseCase {
  execute(id: string): Promise<Grupo>
}

export class GetByIdGrupoUseCase implements IGetByIdGrupoUseCase {
  constructor (private gruposRepository: IGruposRepository) {}

  async execute (id: string) {
    const grupo = await this.gruposRepository.getOne(id)
    if (!grupo) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return grupo
  }
}
