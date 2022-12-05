import { NextFunction, Request, Response } from "express";
import { IRemovePagamentoUseCase } from "./RemovePagamentoUseCase";

export class RemovePagamentoController {
  constructor(private removePagamentoUseCase: IRemovePagamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pagamentos = await this.removePagamentoUseCase.execute(
        req.params.id,
        req.params.agendamentoId
      );
      res.status(201).json(pagamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
