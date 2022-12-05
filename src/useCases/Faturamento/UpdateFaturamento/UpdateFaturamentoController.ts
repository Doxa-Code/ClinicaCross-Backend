import { IUpdateFaturamentoUseCase } from "./UpdateFaturamentoUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdateFaturamentoController {
  constructor(private updateFaturamentoUseCase: IUpdateFaturamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const faturamento = await this.updateFaturamentoUseCase.execute(
        req.body,
        { _id: id }
      );
      res.status(200).json(faturamento);
    } catch (err: any) {
      next(err);
    }
  }
}
