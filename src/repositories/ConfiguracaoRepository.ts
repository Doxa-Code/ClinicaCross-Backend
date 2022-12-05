import ConfiguracaoModel from "../schemas/ConfiguracaoSchema";
import { Configuracao } from "../entities/Configuracao";

export interface IConfiguracaoRepository {
  index(): Promise<Configuracao | null>
  save(data: Configuracao): Promise<Configuracao>
  update(data: Configuracao): Promise<void>
}

export class ConfiguracaoRepository implements IConfiguracaoRepository {
  async save(data: Configuracao) {
    const configuracao = await ConfiguracaoModel.create(data)
    
    return configuracao.toObject()
  }

  async update(data: Configuracao){
    await ConfiguracaoModel.updateMany({}, data)
  }
  
  async index() {
    const configuracoes = await ConfiguracaoModel.find()
    if(!configuracoes) return null
    return configuracoes[0]
  }

}