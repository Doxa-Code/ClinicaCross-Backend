import { NextFunction, Request, Response } from "express";
import { IGetFinanceiroUseCase } from "./GetFinanceiroUseCase";

export class GetFinanceiroController {
  constructor(private getFinanceiroUseCase: IGetFinanceiroUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.getFinanceiroUseCase.execute(req.body);
      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
