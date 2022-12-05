import { IGuiaSADTService } from "./../../../services/GuiaSADTService";
import { IConfiguracaoRepository } from "./../../../repositories/ConfiguracaoRepository";
import { IFaturamentoRepository } from "./../../../repositories/FaturamentoRepository";
import getStream from 'get-stream';

export interface IGetGuiaSADTUseCase {
  execute(id: string): Promise<Buffer>
}

export class GetGuiaSADTUseCase implements IGetGuiaSADTUseCase {
  constructor (private faturamentosRepository: IFaturamentoRepository, private configuracaoRepository: IConfiguracaoRepository, private guiaSADTService: IGuiaSADTService) {}

  async execute (id: string) {
    const configuracao = await this.configuracaoRepository.index()
    const faturamento = await this.faturamentosRepository.show({ "prestadorParaOperadora.loteGuias.guiasTISS._id": id })
    const guia = faturamento?.prestadorParaOperadora.loteGuias.guiasTISS.find(guia => guia?._id?.toString() === id)
    
    const pdf = await this.guiaSADTService.create({
      guia,
      configuracao
    })
    
    if(!pdf) throw new Error('Não foi possível gerar o PDF')

    return await getStream.buffer(pdf)
  }
}
