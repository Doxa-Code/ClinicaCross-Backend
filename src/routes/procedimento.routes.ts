import { Router } from "express";

import { createProcedimentoController } from "../useCases/Procedimento/CreateProcedimento";
import { updateProcedimentoController } from "../useCases/Procedimento/UpdateProcedimento";
import { deleteProcedimentoController } from "../useCases/Procedimento/DeleteProcedimento";
import { getByIdProcedimentoController } from "../useCases/Procedimento/GetByIdProcedimento";
import { getAllProcedimentoController } from "../useCases/Procedimento/GetAllProcedimento";

const Routes = Router();

Routes.route("/procedimentos")
  .get(function (req, res, next) {
    return getAllProcedimentoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createProcedimentoController.handle(req, res, next);
  });

Routes.route("/procedimentos/:id")
  .get(function (req, res, next) {
    return getByIdProcedimentoController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateProcedimentoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteProcedimentoController.handle(req, res, next);
  });

export default Routes;
