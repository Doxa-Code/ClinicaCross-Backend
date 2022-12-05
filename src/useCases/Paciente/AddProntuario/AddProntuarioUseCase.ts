import { Prontuario } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddProntuarioDTO } from './AddProntuarioDTO'

export interface IAddProntuarioUseCase {
  execute(data: IAddProntuarioDTO, pacienteId: string): Promise<Prontuario[]>
}

export class AddProntuarioUseCase implements IAddProntuarioUseCase {
  constructor (private pacienteRepository: IPacienteRepository) {}

  async execute (data: IAddProntuarioDTO, pacienteId: string) {
    const prontuarioDTO = new Prontuario(data)
    
    const response = await this.pacienteRepository.addProntuario(prontuarioDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar o prontuario')
    
    const paciente = await this.pacienteRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.prontuario
  }
}
