import { Configuracao } from "../../../entities/Configuracao";
import { SetConfiguracaoDTO } from "./SetConfiguracaoDTO";
import { IConfiguracaoRepository } from "../../../repositories/ConfiguracaoRepository";

export interface ISetConfiguracaoUseCase {
  execute(data: SetConfiguracaoDTO): Promise<void>
}

export class SetConfiguracaoUseCase implements ISetConfiguracaoUseCase {
  constructor(private configuracaoRepository: IConfiguracaoRepository) {}
  
  async execute(data: SetConfiguracaoDTO) {
    const configuracaoDTO = new Configuracao(data)
    const configuracoes = await this.configuracaoRepository.index()
    if(!configuracoes){
      await this.configuracaoRepository.save(configuracaoDTO)
      return 
    }
    await this.configuracaoRepository.update(configuracaoDTO)
  }
}