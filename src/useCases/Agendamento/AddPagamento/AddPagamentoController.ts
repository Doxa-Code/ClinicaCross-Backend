import { NextFunction, Request, Response } from "express";
import { IAddPagamentoUseCase } from "./AddPagamentoUseCase";

export class AddPagamentoController {
  constructor(private addPagamentoUseCase: IAddPagamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pagamentos = await this.addPagamentoUseCase.execute(
        req.body,
        req.params.agendamentoId
      );
      res.status(201).json(pagamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
