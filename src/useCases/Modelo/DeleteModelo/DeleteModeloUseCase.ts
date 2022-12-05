import { IModeloRepository } from '../../../repositories/ModeloRepository'
import { IDeleteModeloDTO } from './DeleteModeloDTO'

export interface IDeleteModeloUseCase {
  execute(data: IDeleteModeloDTO): Promise<void>
}

export class DeleteModeloUseCase implements IDeleteModeloUseCase {
  constructor (private ModeloRepository: IModeloRepository) {}

  async execute (data: IDeleteModeloDTO) {
    const response = await this.ModeloRepository.delete(data._id)
    if (!response) {
      throw new Error('Houve um erro ao tentar remover o registro! Tente novamente mais tarde!')
    }
  }
}
