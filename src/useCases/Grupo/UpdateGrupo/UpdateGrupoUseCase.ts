import { IGruposRepository } from '../../../repositories/GruposRepository'
import { IUpdateGrupoDTO } from './UpdateGrupoDTO'

export interface IUpdateGrupoUseCase {
  execute(id: string, data: IUpdateGrupoDTO): Promise<void>
}

export class UpdateGrupoUseCase implements IUpdateGrupoUseCase {
  constructor (private gruposRepository: IGruposRepository) {}

  async execute (id: string, data: IUpdateGrupoDTO) {
    await this.gruposRepository.update(id, data)
  }
}
