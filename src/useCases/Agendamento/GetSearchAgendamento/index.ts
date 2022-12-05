import { AgendamentosRepository } from "../../../repositories/AgendamentosRepository";
import { GetSearchAgendamentoUseCase } from "./GetSearchAgendamentoUseCase";
import { GetSearchAgendamentoController } from "./GetSearchAgendamentoController";

const agendamentosRepository = new AgendamentosRepository();
const getSearchAgendamentoUseCase = new GetSearchAgendamentoUseCase(
  agendamentosRepository
);
const getSearchAgendamentoController = new GetSearchAgendamentoController(
  getSearchAgendamentoUseCase
);

export { getSearchAgendamentoController };
