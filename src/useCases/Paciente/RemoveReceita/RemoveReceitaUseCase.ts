import { Receita } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'

export interface IRemoveReceitaUseCase {
  execute(id: string, pacienteId: string): Promise<Receita[]>
}

export class RemoveReceitaUseCase implements IRemoveReceitaUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (id: string, pacienteId: string) {
    const response = await this.pacientesRepository.removeReceita(id, pacienteId)
    if (!response) throw new Error('Não foi possível remover a receita')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')
    
    return paciente?.receita
  }
}
