import { IXmlService } from "./../../../services/XmlService";
import { IConfiguracaoRepository } from "./../../../repositories/ConfiguracaoRepository";
import { IFaturamentoRepository } from "./../../../repositories/FaturamentoRepository";

export interface IGetGetXMLUseCase {
  execute(id: string): Promise<Buffer>
}

export class GetGetXMLUseCase implements IGetGetXMLUseCase {
  constructor (private faturamentosRepository: IFaturamentoRepository, private configuracaoRepository: IConfiguracaoRepository, private xmlService: IXmlService) {}

  async execute (id: string) {
    const configuracao = await this.configuracaoRepository.index()
    const faturamento = await this.faturamentosRepository.show({ _id: id })
    if(!faturamento || !configuracao) throw new Error('Faturamento não encontrado')
    
    const xml = await this.xmlService.create({
      faturamento,
      configuracao
    })
    
    if(!xml) throw new Error('Não foi possível gerar o PDF')

    return xml
  }
}
