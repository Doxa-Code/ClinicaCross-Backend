import { NextFunction, Request, Response } from "express";
import { IUpdateProcedimentoUseCase } from "./UpdateProcedimentoUseCase";

export class UpdateProcedimentoController {
  constructor(private updateProcedimentoCase: IUpdateProcedimentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateProcedimentoCase.execute(req.params.id, req.body);
      res.status(201).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
