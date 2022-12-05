import { IFaturamentoRepository } from "./../../../repositories/FaturamentoRepository";
import { Faturamento } from "../../../entities/Faturamento";

export interface IGetAllFaturamentoUseCase {
  execute(): Promise<Faturamento[]>
}

export class GetAllFaturamentoUseCase implements IGetAllFaturamentoUseCase {
  constructor(private faturamentoRepository: IFaturamentoRepository){}

  async execute() {
    const faturamentos = await this.faturamentoRepository.index();
    return faturamentos
  }
}