import { Grupo } from '../../../entities/Grupo'
import { IGruposRepository } from '../../../repositories/GruposRepository'
import { ICreateGrupoDTO } from './CreateGrupoDTO'

export interface ICreateGrupoUseCase {
  execute(data: ICreateGrupoDTO): Promise<Grupo>
}

export class CreateGrupoUseCase implements ICreateGrupoUseCase {
  constructor (private gruposRepository: IGruposRepository) {}

  async execute (data: ICreateGrupoDTO) {
    const grupoDTO = new Grupo(data)
    const grupo = await this.gruposRepository.save(grupoDTO)
    if (!grupo) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    return grupo
  }
}
