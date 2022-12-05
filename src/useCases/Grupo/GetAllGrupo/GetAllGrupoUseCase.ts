import { Grupo } from '../../../entities/Grupo'
import { IGruposRepository } from '../../../repositories/GruposRepository'

export interface IGetAllGrupoUseCase {
  execute(): Promise<Omit<Grupo, 'password'>[]>
}

export class GetAllGrupoUseCase implements IGetAllGrupoUseCase {
  constructor (private gruposRepository: IGruposRepository) {}

  async execute () {
    const grupos = await this.gruposRepository.getAll()
    if (!grupos) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return grupos
  }
}
