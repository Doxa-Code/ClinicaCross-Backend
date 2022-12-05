import { IConvenioRepository } from "../../../repositories/ConvenioRepository";
import { Convenio } from "../../../entities/Convenio";

export interface IGetAllConvenioUseCase {
  execute(): Promise<Convenio[] | []>;
}

export class GetAllConvenioUseCase implements IGetAllConvenioUseCase {
  constructor(private convenioRepository: IConvenioRepository) {}

  async execute() {
    const convenios = await this.convenioRepository.index();
    return convenios;
  }
}
