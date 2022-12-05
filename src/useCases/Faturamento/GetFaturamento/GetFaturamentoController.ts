import { NextFunction, Request, Response } from "express";
import { IGetFaturamentoUseCase } from "./GetFaturamentoUseCase";

export class GetFaturamentoController {
  constructor(private getFaturamentoUseCase: IGetFaturamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const faturamentos = await this.getFaturamentoUseCase.execute({
        _id: id,
      });
      res.status(200).json(faturamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
