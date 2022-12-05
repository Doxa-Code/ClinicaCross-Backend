import { Laudo } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'

export interface IRemoveLaudoUseCase {
  execute(id: string, pacienteId: string): Promise<Laudo[]>
}

export class RemoveLaudoUseCase implements IRemoveLaudoUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (id: string, pacienteId: string) {
    const response = await this.pacientesRepository.removeLaudo(id, pacienteId)
    if (!response) throw new Error('Não foi possível remover o laudo')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')
    
    return paciente?.laudo
  }
}
