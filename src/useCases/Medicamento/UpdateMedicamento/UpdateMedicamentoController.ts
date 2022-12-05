import { NextFunction, Request, Response } from "express";
import { IUpdateMedicamentoUseCase } from "./UpdateMedicamentoUseCase";

export class UpdateMedicamentoController {
  constructor(private updateMedicamentoCase: IUpdateMedicamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateMedicamentoCase.execute(req.params.id, req.body);
      res.status(201).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
