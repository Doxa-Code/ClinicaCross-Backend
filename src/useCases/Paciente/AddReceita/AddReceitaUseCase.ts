import { Receita } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddReceitaDTO } from './AddReceitaDTO'

export interface IAddReceitaUseCase {
  execute(data: IAddReceitaDTO, pacienteId: string): Promise<Receita[]>
}

export class AddReceitaUseCase implements IAddReceitaUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (data: IAddReceitaDTO, pacienteId: string) {
    const receitaDTO = new Receita(data)
    
    const response = await this.pacientesRepository.addReceita(receitaDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar a receita')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.receita
  }
}
