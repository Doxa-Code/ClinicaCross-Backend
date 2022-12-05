import { GetFaturamentoUseCase } from "./GetFaturamentoUseCase";
import { GetFaturamentoController } from "./GetFaturamentoController";
import { FaturamentoRepository } from "../../../repositories/FaturamentoRepository";


const faturamentoRepository = new FaturamentoRepository()
const getFaturamentoUseCase = new GetFaturamentoUseCase(faturamentoRepository)
const getFaturamentoController = new GetFaturamentoController(getFaturamentoUseCase)

export { getFaturamentoController }