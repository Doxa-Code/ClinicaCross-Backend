import { NextFunction, Request, Response } from "express";
import { IUpdatePagamentoUseCase } from "./UpdatePagamentoUseCase";

export class UpdatePagamentoController {
  constructor(private updatePagamentoUseCase: IUpdatePagamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pagamentos = await this.updatePagamentoUseCase.execute(
        req.body,
        req.params.agendamentoId,
        req.params.id
      );
      res.status(201).json(pagamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
