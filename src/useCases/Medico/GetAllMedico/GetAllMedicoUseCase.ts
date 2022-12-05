import { IMedicoRepository } from "../../../repositories/MedicoRepository";
import { Medico } from "../../../entities/Medico";

export interface IGetAllMedicoUseCase {
  execute(): Promise<Medico[] | []>
}

export class GetAllMedicoUseCase implements IGetAllMedicoUseCase {
  constructor(private MedicoRepository: IMedicoRepository){}

  async execute() {
    const medicos = await this.MedicoRepository.index();
    return medicos
  }
}