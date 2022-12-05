import { Atestado } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddAtestadoDTO } from './AddAtestadoDTO'

export interface IAddAtestadoUseCase {
  execute(data: IAddAtestadoDTO, pacienteId: string): Promise<Atestado[]>
}

export class AddAtestadoUseCase implements IAddAtestadoUseCase {
  constructor (private pacienteRepository: IPacienteRepository) {}

  async execute (data: IAddAtestadoDTO, pacienteId: string) {
    const atestadoDTO = new Atestado(data)
    
    const response = await this.pacienteRepository.addAtestado(atestadoDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar o atestado')
    
    const paciente = await this.pacienteRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.atestado
  }
}
