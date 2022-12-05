import { IModeloRepository } from '../../../repositories/ModeloRepository'
import { IUpdateModeloDTO } from './UpdateModeloDTO'

export interface IUpdateModeloUseCase {
  execute(id: string, data: IUpdateModeloDTO): Promise<void>
}

export class UpdateModeloUseCase implements IUpdateModeloUseCase {
  constructor (private modelosRepository: IModeloRepository) {}

  async execute (id: string, data: IUpdateModeloDTO) {
    const response = await this.modelosRepository.update(id, data)
    if (!response) throw new Error('Houve um erro ao processar a alteração! Tente novamente mais tarde!')
  }
}
