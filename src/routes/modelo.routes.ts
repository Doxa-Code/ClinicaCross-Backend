import { Router } from "express";

import { createModeloController } from "../useCases/Modelo/CreateModelo";
import { updateModeloController } from "../useCases/Modelo/UpdateModelo";
import { deleteModeloController } from "../useCases/Modelo/DeleteModelo";
import { getByIdModeloController } from "../useCases/Modelo/GetByIdModelo";
import { getAllTypesModeloController } from "../useCases/Modelo/GetAllTypesModelo";

const Routes = Router();

Routes.route("/modelos")
  .get(function (req, res, next) {
    return getAllTypesModeloController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createModeloController.handle(req, res, next);
  });

Routes.route("/modelos/:id")
  .get(function (req, res, next) {
    return getByIdModeloController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateModeloController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteModeloController.handle(req, res, next);
  });

export default Routes;
