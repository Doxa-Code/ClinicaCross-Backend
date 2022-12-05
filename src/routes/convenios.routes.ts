import { Router } from "express";

import { upload } from "../config/multer";

import { createConvenioController } from "../useCases/Convenio/CreateConvenio";
import { getAllConvenioController } from "../useCases/Convenio/GetAllConvenio";
import { updateConvenioController } from "../useCases/Convenio/UpdateConvenio";
import { getConvenioController } from "../useCases/Convenio/GetConvenio";
import { deleteConvenioController } from "../useCases/Convenio/DeleteConvenio";
import { getConvenioUploaderController } from "../useCases/Convenio/GetConvenioUploader";

const Routes = Router();
Routes.route("/convenios/uploader/:codigo").get(function (req, res, next) {
  return getConvenioUploaderController.handle(req, res, next);
});

Routes.route("/convenios")
  .get(function (req, res, next) {
    return getAllConvenioController.handle(req, res, next);
  })
  .post(upload("convenios").single("thumbnail"), function (req, res, next) {
    return createConvenioController.handle(req, res, next);
  });

Routes.route("/convenios/:id")
  .put(upload("convenios").single("thumbnail"), function (req, res, next) {
    return updateConvenioController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getConvenioController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteConvenioController.handle(req, res, next);
  });

export default Routes;
