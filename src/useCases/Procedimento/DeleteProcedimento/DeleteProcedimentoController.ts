import { NextFunction, Request, Response } from "express";
import { IDeleteProcedimentoUseCase } from "./DeleteProcedimentoUseCase";

export class DeleteProcedimentoController {
  constructor(private deleteProcedimentoUseCase: IDeleteProcedimentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteProcedimentoUseCase.execute({ _id: req.params.id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
