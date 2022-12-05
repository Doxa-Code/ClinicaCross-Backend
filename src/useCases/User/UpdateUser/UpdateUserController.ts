import { NextFunction, Request, Response } from "express";
import { IUpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserCase: IUpdateUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateUserCase.execute(req.params.id, req.body);
      res.status(201).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
