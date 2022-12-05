import { NextFunction, Request, Response } from "express";
import { ICreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: ICreateUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      res.status(201).send(user);
    } catch (err: any) {
      next(err);
    }
  }
}
