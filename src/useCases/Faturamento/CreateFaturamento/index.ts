import { CreateFaturamentoController } from "./CreateFaturamentoController";
import { CreateFaturamentoUseCase } from "./CreateFaturamentoUseCase";
import { FaturamentoRepository } from "./../../../repositories/FaturamentoRepository";

const faturamentoRepository = new FaturamentoRepository();
const createFaturamentoUseCase = new CreateFaturamentoUseCase(faturamentoRepository);
const createFaturamentoController = new CreateFaturamentoController(createFaturamentoUseCase);

export { createFaturamentoController }