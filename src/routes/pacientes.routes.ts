import { Router } from "express";

import { upload } from "../config/multer";

import { createPacienteController } from "../useCases/Paciente/CreatePaciente";
import { getAllPacienteController } from "../useCases/Paciente/GetAllPaciente";
import { updatePacienteController } from "../useCases/Paciente/UpdatePaciente";
import { getPacienteController } from "../useCases/Paciente/GetPaciente";
import { addLaudoController } from "../useCases/Paciente/AddLaudo";
import { addPedidoController } from "../useCases/Paciente/AddPedido";
import { removeLaudoController } from "../useCases/Paciente/RemoveLaudo";
import { removePedidoController } from "../useCases/Paciente/RemovePedido";
import { removeReceitaController } from "../useCases/Paciente/RemoveReceita";
import { removeExameController } from "../useCases/Paciente/RemoveExame";
import { addReceitaController } from "../useCases/Paciente/AddReceita";
import { addExameController } from "../useCases/Paciente/AddExame";
import { addAtestadoController } from "../useCases/Paciente/AddAtestado";
import { deletePacienteController } from "../useCases/Paciente/DeletePaciente";
import { addProntuarioController } from "../useCases/Paciente/AddProntuario";

import { removeAnexoController } from "../useCases/Paciente/RemoveAnexo";
import { addAnexoController } from "../useCases/Paciente/AddAnexo";
import { searchPacienteController } from "../useCases/Paciente/SearchPaciente";
import { getPacienteUploaderController } from "../useCases/Paciente/GetPacienteUploader";
import { addDeclaracaoController } from "../useCases/Paciente/AddDeclaracao";

const Routes = Router();

Routes.route("/pacientes/uploader").post(function (req, res, next) {
  return getPacienteUploaderController.handle(req, res, next);
});

Routes.route("/pacientes/laudo/:pacienteId/:id").delete(function (
  req,
  res,
  next
) {
  return removeLaudoController.handle(req, res, next);
});

Routes.route("/pacientes/pedido/:pacienteId/:id").delete(function (
  req,
  res,
  next
) {
  return removePedidoController.handle(req, res, next);
});

Routes.route("/pacientes/laudo/:pacienteId").post(function (req, res, next) {
  return addLaudoController.handle(req, res, next);
});

Routes.route("/pacientes/pedido/:pacienteId").post(function (req, res, next) {
  return addPedidoController.handle(req, res, next);
});

Routes.route("/pacientes/prontuario/:pacienteId").post(function (
  req,
  res,
  next
) {
  return addProntuarioController.handle(req, res, next);
});

Routes.route("/pacientes/declaracao/:pacienteId").post(function (
  req,
  res,
  next
) {
  return addDeclaracaoController.handle(req, res, next);
});

Routes.route("/pacientes/atestado/:pacienteId").post(function (req, res, next) {
  return addAtestadoController.handle(req, res, next);
});

Routes.route("/pacientes/receita/:pacienteId/:id").delete(function (
  req,
  res,
  next
) {
  return removeReceitaController.handle(req, res, next);
});

Routes.route("/pacientes/exame/:pacienteId/:id").delete(function (
  req,
  res,
  next
) {
  return removeExameController.handle(req, res, next);
});

Routes.route("/pacientes/receita/:pacienteId").post(function (req, res, next) {
  return addReceitaController.handle(req, res, next);
});

Routes.route("/pacientes/exame/:pacienteId").post(function (req, res, next) {
  return addExameController.handle(req, res, next);
});

Routes.route("/pacientes/anexo/:pacienteId/:id").delete(function (
  req,
  res,
  next
) {
  return removeAnexoController.handle(req, res, next);
});

Routes.route("/pacientes/anexo/:pacienteId").post(
  upload("pacientes").single("anexo"),
  function (req, res, next) {
    return addAnexoController.handle(req, res, next);
  }
);

Routes.route("/pacientes/search").get(function (req, res, next) {
  return searchPacienteController.handle(req, res, next);
});

Routes.route("/pacientes")
  .get(function (req, res, next) {
    return getAllPacienteController.handle(req, res, next);
  })
  .post(upload("pacientes").single("thumbnail"), function (req, res, next) {
    return createPacienteController.handle(req, res, next);
  });

Routes.route("/pacientes/:id")
  .put(upload("pacientes").single("thumbnail"), function (req, res, next) {
    return updatePacienteController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getPacienteController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deletePacienteController.handle(req, res, next);
  });

export default Routes;
