import { GetAllFaturamentoUseCase } from "./GetAllFaturamentoUseCase";
import { GetAllFaturamentoController } from "./GetAllFaturamentoController";
import { FaturamentoRepository } from "./../../../repositories/FaturamentoRepository";


const faturamentoRepository = new FaturamentoRepository()
const getAllFaturamentoUseCase = new GetAllFaturamentoUseCase(faturamentoRepository)
const getAllFaturamentoController = new GetAllFaturamentoController(getAllFaturamentoUseCase)

export { getAllFaturamentoController }