import { NextFunction, Request, Response } from "express";
import { IGetAllUserUseCase } from "./GetAllUserUseCase";

export class GetAllUserController {
  constructor(private getAllUserUseCase: IGetAllUserUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getAllUserUseCase.execute();
      res.status(201).send(users);
    } catch (err: any) {
      next(err);
    }
  }
}
