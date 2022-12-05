import { Laudo } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddLaudoDTO } from './AddLaudoDTO'

export interface IAddLaudoUseCase {
  execute(data: IAddLaudoDTO, pacienteId: string): Promise<Laudo[]>
}

export class AddLaudoUseCase implements IAddLaudoUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (data: IAddLaudoDTO, pacienteId: string) {
    const laudoDTO = new Laudo(data)
    
    const response = await this.pacientesRepository.addLaudo(laudoDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar o laudo')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.laudo
  }
}
