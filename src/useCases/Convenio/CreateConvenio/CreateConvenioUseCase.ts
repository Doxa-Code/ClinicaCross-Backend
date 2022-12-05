import { Convenio } from "../../../entities/Convenio";
import { CreateConvenioDTO } from "./CreateConvenioDTO";
import { IConvenioRepository } from "../../../repositories/ConvenioRepository";

export interface ICreateConvenioUseCase {
  execute(data: CreateConvenioDTO): Promise<Convenio>
}

export class CreateConvenioUseCase implements ICreateConvenioUseCase {
  constructor(private convenioRepository: IConvenioRepository) {}
  
  async execute(data: CreateConvenioDTO) {
    const convenioDTO = new Convenio(data)
    const convenio = await this.convenioRepository.save(convenioDTO)

    return convenio
  }
}