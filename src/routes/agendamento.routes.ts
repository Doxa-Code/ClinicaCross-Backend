import { Router } from "express";

import { createAgendamentoController } from "../useCases/Agendamento/CreateAgendamento";
import { updateAgendamentoController } from "../useCases/Agendamento/UpdateAgendamento";
import { deleteAgendamentoController } from "../useCases/Agendamento/DeleteAgendamento";
import { getByIdAgendamentoController } from "../useCases/Agendamento/GetByIdAgendamento";
import { getAllAgendamentoController } from "../useCases/Agendamento/GetAllAgendamento";
import { addPagamentoController } from "../useCases/Agendamento/AddPagamento";
import { updatePagamentoController } from "../useCases/Agendamento/UpdatePagamento";
import { removePagamentoController } from "../useCases/Agendamento/RemovePagamento";
import { addReciboController } from "../useCases/Agendamento/AddRecibo";
import { removeReciboController } from "../useCases/Agendamento/RemoveRecibo";
import { getHistoricoController } from "../useCases/Agendamento/GetHistorico";
import { getRelatorioController } from "../useCases/Agendamento/GetRelatorio";
import { getFinanceiroController } from "../useCases/Agendamento/GetFinanceiro";
import { getSearchAgendamentoController } from "../useCases/Agendamento/GetSearchAgendamento";

const Routes = Router();

Routes.route("/agendamentos/search").post(function (req, res, next) {
  return getSearchAgendamentoController.handle(req, res, next);
});

Routes.route("/agendamentos/uploader").post(function (req, res, next) {
  return getSearchAgendamentoController.handle(req, res, next);
});

Routes.route("/agendamentos")
  .get(function (req, res, next) {
    return getAllAgendamentoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createAgendamentoController.handle(req, res, next);
  });

Routes.route("/agendamentos/relatorio").post(function (req, res, next) {
  return getRelatorioController.handle(req, res, next);
});

Routes.route("/agendamentos/financeiro").post(function (req, res, next) {
  return getFinanceiroController.handle(req, res, next);
});

Routes.route("/agendamentos/historico/:pacienteId").get(function (
  req,
  res,
  next
) {
  return getHistoricoController.handle(req, res, next);
});

Routes.route("/agendamentos/recibo/:agendamentoId/:id").delete(function (
  req,
  res,
  next
) {
  return removeReciboController.handle(req, res, next);
});

Routes.route("/agendamentos/recibo/:agendamentoId").post(function (
  req,
  res,
  next
) {
  return addReciboController.handle(req, res, next);
});

Routes.route("/agendamentos/pagamento/:agendamentoId/:id")
  .delete(function (req, res, next) {
    return removePagamentoController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updatePagamentoController.handle(req, res, next);
  });

Routes.route("/agendamentos/pagamento/:agendamentoId").post(function (
  req,
  res,
  next
) {
  return addPagamentoController.handle(req, res, next);
});

Routes.route("/agendamentos/:id")
  .get(function (req, res, next) {
    return getByIdAgendamentoController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateAgendamentoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteAgendamentoController.handle(req, res, next);
  });

export default Routes;
