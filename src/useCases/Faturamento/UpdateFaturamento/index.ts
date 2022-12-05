import { UpdateFaturamentoController } from "./UpdateFaturamentoController";
import { UpdateFaturamentoUseCase } from "./UpdateFaturamentoUseCase";
import { FaturamentoRepository } from "../../../repositories/FaturamentoRepository";

const faturamentoRepository = new FaturamentoRepository();
const updateFaturamentoUseCase = new UpdateFaturamentoUseCase(faturamentoRepository);
const updateFaturamentoController = new UpdateFaturamentoController(updateFaturamentoUseCase);

export { updateFaturamentoController }