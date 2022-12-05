import { Configuracao } from "./../../../entities/Configuracao";
import { IConfiguracaoRepository } from "../../../repositories/ConfiguracaoRepository";

export interface IGetConfiguracaoUseCase {
  execute(): Promise<Configuracao | {}>
}

export class GetConfiguracaoUseCase implements IGetConfiguracaoUseCase {
  constructor(private configuracaoRepository: IConfiguracaoRepository){}

  async execute() {
    const configuracoes = await this.configuracaoRepository.index();
    if(!configuracoes) return {}
    return configuracoes
  }
}