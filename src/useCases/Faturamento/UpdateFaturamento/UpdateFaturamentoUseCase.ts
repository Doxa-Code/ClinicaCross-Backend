import { Faturamento } from "./../../../entities/Faturamento";
import { FaturamentoDocument } from "./../../../schemas/FaturamentoSchema";
import { FilterQuery } from "mongoose";
import { UpdateFaturamentoDTO } from "./UpdateFaturamentoDTO";
import { IFaturamentoRepository } from "../../../repositories/FaturamentoRepository";

export interface IUpdateFaturamentoUseCase {
  execute(data: UpdateFaturamentoDTO, query: FilterQuery<FaturamentoDocument>): Promise<Faturamento | null>
}

export class UpdateFaturamentoUseCase implements IUpdateFaturamentoUseCase {
  constructor(private faturamentoRepository: IFaturamentoRepository) {}
  
  async execute(data: UpdateFaturamentoDTO, query: FilterQuery<FaturamentoDocument>) {
    const faturamentoDTO = new Faturamento(data)
    await this.faturamentoRepository.update(faturamentoDTO, query)
    const faturamento = await this.faturamentoRepository.show(query)
    return faturamento
  }
}