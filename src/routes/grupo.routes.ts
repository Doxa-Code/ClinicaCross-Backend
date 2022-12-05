import { Router } from "express";

import { createGrupoController } from "../useCases/Grupo/CreateGrupo";
import { updateGrupoController } from "../useCases/Grupo/UpdateGrupo";
import { deleteGrupoController } from "../useCases/Grupo/DeleteGrupo";
import { getByIdGrupoController } from "../useCases/Grupo/GetByIdGrupo";
import { getAllGrupoController } from "../useCases/Grupo/GetAllGrupo";

const Routes = Router();

Routes.route("/grupos")
  .get(function (req, res, next) {
    return getAllGrupoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createGrupoController.handle(req, res, next);
  });

Routes.route("/grupos/:id")
  .get(function (req, res, next) {
    return getByIdGrupoController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateGrupoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteGrupoController.handle(req, res, next);
  });

export default Routes;
