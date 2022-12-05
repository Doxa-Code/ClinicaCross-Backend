import { Router } from "express";

import { createUnidadeMedidaController } from "../useCases/UnidadeMedida/CreateUnidadeMedida";
import { getAllUnidadeMedidaController } from "../useCases/UnidadeMedida/GetAllUnidadeMedida";
import { updateUnidadeMedidaController } from "../useCases/UnidadeMedida/UpdateUnidadeMedida";
import { getUnidadeMedidaController } from "../useCases/UnidadeMedida/GetUnidadeMedida";
import { deleteUnidadeMedidaController } from "../useCases/UnidadeMedida/DeleteUnidadeMedida";

const Routes = Router();

Routes.route("/unidadeMedidas")
  .get(function (req, res, next) {
    return getAllUnidadeMedidaController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createUnidadeMedidaController.handle(req, res, next);
  });

Routes.route("/unidadeMedidas/:id")
  .put(function (req, res, next) {
    return updateUnidadeMedidaController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getUnidadeMedidaController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteUnidadeMedidaController.handle(req, res, next);
  });

export default Routes;
