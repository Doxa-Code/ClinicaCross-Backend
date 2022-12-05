import { Exame } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddExameDTO } from './AddExameDTO'

export interface IAddExameUseCase {
  execute(data: IAddExameDTO, pacienteId: string): Promise<Exame[]>
}

export class AddExameUseCase implements IAddExameUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (data: IAddExameDTO, pacienteId: string) {
    const exameDTO = new Exame(data)
    
    const response = await this.pacientesRepository.addExame(exameDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar a Exame')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.exame
  }
}
