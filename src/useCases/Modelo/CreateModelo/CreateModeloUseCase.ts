import { Modelo } from '../../../entities/Modelo'
import { IModeloRepository } from '../../../repositories/ModeloRepository'
import { ICreateModeloDTO } from './CreateModeloDTO'

export interface ICreateModeloUseCase {
  execute(data: ICreateModeloDTO): Promise<Modelo>
}

export class CreateModeloUseCase implements ICreateModeloUseCase {
  constructor (private modelosRepository: IModeloRepository) {}

  async execute (data: ICreateModeloDTO) {
    const modeloDTO = new Modelo(data)
    const modelo = await this.modelosRepository.save(modeloDTO)
    if (!modelo) {
      throw new Error('Houve um erro ao processar o cadastro! Tente novamente mais tarde!')
    }
    return modelo
  }
}
