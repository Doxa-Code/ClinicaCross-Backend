import { Pedido } from '../../../entities/Paciente'
import { IPacienteRepository } from '../../../repositories/PacienteRepository'
import { IAddPedidoDTO } from './AddPedidoDTO'

export interface IAddPedidoUseCase {
  execute(data: IAddPedidoDTO, pacienteId: string): Promise<Pedido[]>
}

export class AddPedidoUseCase implements IAddPedidoUseCase {
  constructor (private pacientesRepository: IPacienteRepository) {}

  async execute (data: IAddPedidoDTO, pacienteId: string) {
    const pedidoDTO = new Pedido(data)
    
    const response = await this.pacientesRepository.addPedido(pedidoDTO, pacienteId)
    if(!response) throw new Error('Não foi possível adicionar o pedido')
    
    const paciente = await this.pacientesRepository.show({ _id: pacienteId })
    if(!paciente) throw new Error('Não foi possível encontrar o paciente')

    return paciente.pedido
  }
}
