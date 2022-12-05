import { Exame } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'

export interface IRemoveExameUseCase {
  execute(id: string, pacienteId: string): Promise<Exame[]>
}

export class RemoveExameUseCase implements IRemoveExameUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (id: string, pacienteId: string) {
    const response = await this.pacientesRepository.removeExame(id, pacienteId)
    if (!response) throw new Error('Não foi possível remover a exame')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')
    
    return paciente?.exame
  }
}
