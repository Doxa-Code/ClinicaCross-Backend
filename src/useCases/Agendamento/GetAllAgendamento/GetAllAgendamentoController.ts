import { NextFunction, Request, Response } from "express";
import { IGetAllAgendamentoUseCase } from "./GetAllAgendamentoUseCase";

export class GetAllAgendamentoController {
  constructor(private getAllAgendamentoUseCase: IGetAllAgendamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.getAllAgendamentoUseCase.execute(
        req.query.linked?.toString() || false,
        req.query.day as string,
        req.query.end as string
      );
      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
