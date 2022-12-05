import { NextFunction, Request, Response } from "express";
import { IDeleteMedicamentoUseCase } from "./DeleteMedicamentoUseCase";

export class DeleteMedicamentoController {
  constructor(private deleteMedicamentoUseCase: IDeleteMedicamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteMedicamentoUseCase.execute({ _id: req.params.id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
