import { Faturamento } from "./../../../entities/Faturamento";
import { CreateFaturamentoDTO } from "./CreateFaturamentoDTO";
import { IFaturamentoRepository } from "./../../../repositories/FaturamentoRepository";

export interface ICreateFaturamentoUseCase {
  execute(data: CreateFaturamentoDTO): Promise<Faturamento>
}

export class CreateFaturamentoUseCase implements ICreateFaturamentoUseCase {
  constructor(private faturamentoRepository: IFaturamentoRepository) {}
  
  async execute(data: CreateFaturamentoDTO) {
    const faturamentoDTO = new Faturamento(data)
    const faturamento = await this.faturamentoRepository.save(faturamentoDTO)

    return faturamento
  }
}