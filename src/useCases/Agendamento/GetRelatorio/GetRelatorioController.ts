import { NextFunction, Request, Response } from "express";
import { IGetRelatorioUseCase } from "./GetRelatorioUseCase";

export class GetRelatorioController {
  constructor(private getRelatorioUseCase: IGetRelatorioUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.getRelatorioUseCase.execute(req.body);
      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
