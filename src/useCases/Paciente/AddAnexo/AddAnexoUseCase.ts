import { Anexo } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddAnexoDTO } from './AddAnexoDTO'

export interface IAddAnexoUseCase {
  execute(data: IAddAnexoDTO, pacienteId: string): Promise<Anexo[]>
}

export class AddAnexoUseCase implements IAddAnexoUseCase {
  constructor (private pacienteRepository: IPacienteRepository) {}

  async execute (data: IAddAnexoDTO, pacienteId: string) {
    const anexoDTO = new Anexo(data)
    
    const response = await this.pacienteRepository.addAnexo(anexoDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar o anexo')
    
    const paciente = await this.pacienteRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.anexo
  }
}
