import { Router } from "express";

import { createUserController } from "../useCases/User/CreateUser";
import { getAllUserController } from "../useCases/User/GetAllUser";
import { authUserController } from "../useCases/User/AuthUser";
import { getByIdUserController } from "../useCases/User/GetByIdUser";
import { updateUserController } from "../useCases/User/UpdateUser";
import { deleteUserController } from "../useCases/User/DeleteUser";

const Routes = Router();

Routes.route("/users")
  .get(function (req, res, next) {
    return getAllUserController.handle(req, res, next);
  })
  .post(function (req, res, next) {
    return createUserController.handle(req, res, next);
  });

Routes.route("/users/:id")
  .get(function (req, res, next) {
    return getByIdUserController.handle(req, res, next);
  })
  .put(function (req, res, next) {
    return updateUserController.handle(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteUserController.handle(req, res, next);
  });

Routes.route("/users/auth").post(function (req, res, next) {
  return authUserController.handle(req, res, next);
});

export default Routes;
