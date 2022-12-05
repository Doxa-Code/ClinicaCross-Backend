import { Router } from "express";

import { createMedicamentoController } from "../useCases/Medicamento/CreateMedicamento";
import { updateMedicamentoController } from "../useCases/Medicamento/UpdateMedicamento";
import { deleteMedicamentoController } from "../useCases/Medicamento/DeleteMedicamento";
import { getByIdMedicamentoController } from "../useCases/Medicamento/GetByIdMedicamento";
import { getAllMedicamentoController } from "../useCases/Medicamento/GetAllMedicamento";

const Routes = Router();

Routes.route("/medicamentos")
  .get(function (req, res, next) {
    return getAllMedicamentoController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createMedicamentoController.handle(req, res, next);
  });

Routes.route("/medicamentos/:id")
  .get(function (req, res, next) {
    return getByIdMedicamentoController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateMedicamentoController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteMedicamentoController.handle(req, res, next);
  });

export default Routes;
