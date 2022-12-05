import { NextFunction, Request, Response } from "express";
import { IGetAllFaturamentoUseCase } from "./GetAllFaturamentoUseCase";

export class GetAllFaturamentoController {
  constructor(private getAllFaturamentoUseCase: IGetAllFaturamentoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const faturamentos = await this.getAllFaturamentoUseCase.execute();
      res.status(200).json(faturamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
