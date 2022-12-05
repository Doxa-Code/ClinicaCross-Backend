import { NextFunction, Request, Response } from "express";
import { IUpdateAgendamentoUseCase } from "./UpdateAgendamentoUseCase";

export class UpdateAgendamentoController {
  constructor(private updateAgendamentoCase: IUpdateAgendamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.updateAgendamentoCase.execute(
        req.params.id,
        req.body
      );
      req.io.emit("update agendamento", agendamentos);
      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
