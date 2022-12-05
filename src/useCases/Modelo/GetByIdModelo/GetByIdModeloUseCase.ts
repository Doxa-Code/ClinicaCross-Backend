import { Modelo } from '../../../entities/Modelo'
import { IModeloRepository } from '../../../repositories/ModeloRepository'

export interface IGetByIdModeloUseCase {
  execute(id: string): Promise<Modelo>
}

export class GetByIdModeloUseCase implements IGetByIdModeloUseCase {
  constructor (private modelosRepository: IModeloRepository) {}

  async execute (id: string) {
    const modelo = await this.modelosRepository.getOne(id)
    if (!modelo) {
      throw new Error('Houve um erro ao buscar os dados! Tente novamente mais tarde!')
    }
    return modelo
  }
}
