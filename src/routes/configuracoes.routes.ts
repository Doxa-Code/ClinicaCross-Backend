import { Router } from "express";

import { setConfiguracaoController } from "../useCases/Configuracao/SetConfiguracao";
import { getConfiguracaoController } from "../useCases/Configuracao/GetConfiguracao";

const Routes = Router();

Routes.route("/configuracoes")
  .post(function (req, res, next) {
    return setConfiguracaoController.handle(req, res, next);
  })
  .get(function (req, res, next) {
    return getConfiguracaoController.handle(req, res, next);
  });

export default Routes;
