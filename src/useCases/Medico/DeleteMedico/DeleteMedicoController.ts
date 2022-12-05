import { NextFunction, Request, Response } from "express";
import { IDeleteMedicoUseCase } from "./DeleteMedicoUseCase";

export class DeleteMedicoController {
  constructor(private deleteMedicoUseCase: IDeleteMedicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteMedicoUseCase.execute({ _id: id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
