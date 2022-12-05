import { DeleteFaturamentoDTO } from "./DeleteFaturamentoDTO";
import { IFaturamentoRepository } from "../../../repositories/FaturamentoRepository";

export interface IDeleteFaturamentoUseCase {
  execute(query: DeleteFaturamentoDTO): Promise<void>
}

export class DeleteFaturamentoUseCase implements IDeleteFaturamentoUseCase {
  constructor(private faturamentoRepository: IFaturamentoRepository){}

  async execute(query: DeleteFaturamentoDTO) {
    await this.faturamentoRepository.delete(query);
  }
}