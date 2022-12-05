import { NextFunction, Request, Response } from "express";
import { IGetByIdAgendamentoUseCase } from "./GetByIdAgendamentoUseCase";

export class GetByIdAgendamentoController {
  constructor(private getByIdAgendamentoUseCase: IGetByIdAgendamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamento = await this.getByIdAgendamentoUseCase.execute(
        req.params.id
      );
      res.status(200).json(agendamento);
    } catch (err: any) {
      next(err);
    }
  }
}
