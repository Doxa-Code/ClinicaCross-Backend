import { Router } from "express";

import { createFormaDePagamentoController } from "../useCases/FormaDePagamento/CreateFormaDePagamento";
import { updateFormaDePagamentoController } from "../useCases/FormaDePagamento/UpdateFormaDePagamento";
import { deleteFormaDePagamentoController } from "../useCases/FormaDePagamento/DeleteFormaDePagamento";
import { getByIdFormaDePagamentoController } from "../useCases/FormaDePagamento/GetByIdFormaDePagamento";
import { getAllFormaDePagamentoController } from "../useCases/FormaDePagamento/GetAllFormaDePagamento";

const Routes = Router();

Routes.route("/formadepagamentos")
  .get(function (req, res, next) {
    return getAllFormaDePagamentoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createFormaDePagamentoController.handle(req, res, next);
  });

Routes.route("/formadepagamentos/:id")
  .get(function (req, res, next) {
    return getByIdFormaDePagamentoController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateFormaDePagamentoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteFormaDePagamentoController.handle(req, res, next);
  });

export default Routes;
