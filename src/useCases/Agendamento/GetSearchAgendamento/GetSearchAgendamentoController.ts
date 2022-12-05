import { NextFunction, Request, Response } from "express";
import { IGetSearchAgendamentoUseCase } from "./GetSearchAgendamentoUseCase";

export class GetSearchAgendamentoController {
  constructor(
    private getSearchAgendamentoUseCase: IGetSearchAgendamentoUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.getSearchAgendamentoUseCase.execute(
        req.body
      );
      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
