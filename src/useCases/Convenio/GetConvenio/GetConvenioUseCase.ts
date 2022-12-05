import { ConvenioDocument } from "../../../schemas/ConvenioSchema";
import { GetConvenioDTO } from "./GetConvenioDTO";
import { IConvenioRepository } from "../../../repositories/ConvenioRepository";

export interface IGetConvenioUseCase {
  execute(query: GetConvenioDTO): Promise<ConvenioDocument | {}>
}

export class GetConvenioUseCase implements IGetConvenioUseCase {
  constructor(private convenioRepository: IConvenioRepository){}

  async execute(query: GetConvenioDTO) {
    const convenio = await this.convenioRepository.show(query);
    if(!convenio) return {}
    return convenio
  }
}