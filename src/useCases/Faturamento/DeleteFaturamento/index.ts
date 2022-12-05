import { DeleteFaturamentoUseCase } from "./DeleteFaturamentoUseCase";
import { DeleteFaturamentoController } from "./DeleteFaturamentoController";
import { FaturamentoRepository } from "../../../repositories/FaturamentoRepository";


const faturamentoRepository = new FaturamentoRepository()
const deleteFaturamentoUseCase = new DeleteFaturamentoUseCase(faturamentoRepository)
const deleteFaturamentoController = new DeleteFaturamentoController(deleteFaturamentoUseCase)

export { deleteFaturamentoController }