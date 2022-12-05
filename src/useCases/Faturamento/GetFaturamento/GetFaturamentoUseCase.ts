import { Faturamento } from "./../../../entities/Faturamento";
import { GetFaturamentoDTO } from "./GetFaturamentoDTO";
import { IFaturamentoRepository } from "../../../repositories/FaturamentoRepository";

export interface IGetFaturamentoUseCase {
  execute(query: GetFaturamentoDTO): Promise<Faturamento>
}

export class GetFaturamentoUseCase implements IGetFaturamentoUseCase {
  constructor(private faturamentoRepository: IFaturamentoRepository){}

  async execute(query: GetFaturamentoDTO) {
    const faturamento = await this.faturamentoRepository.show(query);
    if(!faturamento) throw new Error('Faturamento não encontrado')
    return faturamento
  }
}