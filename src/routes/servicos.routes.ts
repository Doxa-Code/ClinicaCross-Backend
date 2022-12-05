import { Router } from "express";

import { createServicoController } from "../useCases/Servico/CreateServico";
import { getAllServicoController } from "../useCases/Servico/GetAllServico";
import { updateServicoController } from "../useCases/Servico/UpdateServico";
import { getServicoController } from "../useCases/Servico/GetServico";
import { deleteServicoController } from "../useCases/Servico/DeleteServico";

const Routes = Router();

Routes.route("/servicos")
  .get(function (req, res, next) {
    return getAllServicoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createServicoController.handle(req, res, next);
  });

Routes.route("/servicos/:id")
  .put(function (req, res, next) {
    return updateServicoController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getServicoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteServicoController.handle(req, res, next);
  });

export default Routes;
