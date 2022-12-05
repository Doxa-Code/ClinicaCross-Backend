import { Router } from "express";

import { createMedicoController } from "../useCases/Medico/CreateMedico";
import { getAllMedicoController } from "../useCases/Medico/GetAllMedico";
import { updateMedicoController } from "../useCases/Medico/UpdateMedico";
import { getMedicoController } from "../useCases/Medico/GetMedico";
import { deleteMedicoController } from "../useCases/Medico/DeleteMedico";
import { getMedicoUploaderController } from "../useCases/Medico/GetMedicoUploader";

const Routes = Router();

Routes.route("/medicos/uploader/:codigo").get(function (req, res, next) {
  return getMedicoUploaderController.handle(req, res, next);
});

Routes.route("/medicos")
  .get(function (req, res, next) {
    return getAllMedicoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createMedicoController.handle(req, res, next);
  });

Routes.route("/medicos/:id")
  .put(function (req, res, next) {
    return updateMedicoController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getMedicoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteMedicoController.handle(req, res, next);
  });

export default Routes;
