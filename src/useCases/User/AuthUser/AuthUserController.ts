import { NextFunction, Request, Response } from "express";
import { IAuthUserUseCase } from "./AuthUserUseCase";

export class AuthUserController {
  constructor(private authUserUseCase: IAuthUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.authUserUseCase.execute(req.body);
      res.status(200).send(user);
    } catch (err: any) {
      next(err);
    }
  }
}
