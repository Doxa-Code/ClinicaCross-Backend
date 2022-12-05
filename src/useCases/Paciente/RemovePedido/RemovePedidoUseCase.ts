import { Pedido } from "../../../entities/Paciente";
import { IPacienteRepository } from "../../../repositories/PacienteRepository";

export interface IRemovePedidoUseCase {
  execute(id: string, pacienteId: string): Promise<Pedido[]>;
}

export class RemovePedidoUseCase implements IRemovePedidoUseCase {
  constructor(private pacientesRepository: IPacienteRepository) {}

  async execute(id: string, pacienteId: string) {
    const response = await this.pacientesRepository.removePedido(
      id,
      pacienteId
    );
    if (!response) throw new Error("Não foi possível remover o pedido");

    const paciente = await this.pacientesRepository.show({ _id: pacienteId });
    if (!paciente) throw new Error("Não foi possível encontrar o paciente");

    return paciente?.pedido;
  }
}
