import { ConvenioDocument } from "../../../schemas/ConvenioSchema";
import { GetConvenioUploaderDTO } from "./GetConvenioUploaderDTO";
import { IConvenioRepository } from "../../../repositories/ConvenioRepository";

export interface IGetConvenioUploaderUseCase {
  execute(query: GetConvenioUploaderDTO): Promise<ConvenioDocument | {}>;
}

export class GetConvenioUploaderUseCase implements IGetConvenioUploaderUseCase {
  constructor(private convenioRepository: IConvenioRepository) {}

  async execute(query: GetConvenioUploaderDTO) {
    const convenio = await this.convenioRepository.show(query);
    if (!convenio) return {};
    return convenio;
  }
}
