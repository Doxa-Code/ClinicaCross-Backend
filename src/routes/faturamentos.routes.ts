import { Router } from "express";

import { createFaturamentoController } from "../useCases/Faturamento/CreateFaturamento";
import { getAllFaturamentoController } from "../useCases/Faturamento/GetAllFaturamento";
import { updateFaturamentoController } from "../useCases/Faturamento/UpdateFaturamento";
import { getFaturamentoController } from "../useCases/Faturamento/GetFaturamento";
import { deleteFaturamentoController } from "../useCases/Faturamento/DeleteFaturamento";
import { getAllFaturarController } from "../useCases/Faturamento/GetAllFaturar";
import { getGuiaSADTController } from "../useCases/Faturamento/GetGuiaSADT";
import { getXMLController } from "../useCases/Faturamento/GetXML";

const Routes = Router();

Routes.route("/faturamentos/guiaSADT/:id").get(function (req, res, next) {
  return getGuiaSADTController.handle(req, res, next);
});

Routes.route("/faturamentos/XML/:id").get(function (req, res, next) {
  return getXMLController.handle(req, res, next);
});

Routes.route("/faturamentos")
  .get(function (req, res, next) {
    return getAllFaturamentoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createFaturamentoController.handle(req, res, next);
  });

Routes.route("/faturamentos/agendamento").get(function (req, res, next) {
  return getAllFaturarController.handle(req, res, next);
});

Routes.route("/faturamentos/:id")
  .put(function (req, res, next) {
    return updateFaturamentoController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getFaturamentoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteFaturamentoController.handle(req, res, next);
  });

export default Routes;
