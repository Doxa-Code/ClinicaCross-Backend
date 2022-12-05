import { NextFunction, Request, Response } from "express";
import { IDeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteUserUseCase.execute({ _id: req.params.id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
