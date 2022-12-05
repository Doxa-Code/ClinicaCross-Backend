import { NextFunction, Request, Response } from "express";
import { IUpdateFormaDePagamentoUseCase } from "./UpdateFormaDePagamentoUseCase";

export class UpdateFormaDePagamentoController {
  constructor(
    private updateFormaDePagamentoCase: IUpdateFormaDePagamentoUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateFormaDePagamentoCase.execute(req.params.id, req.body);
      res.status(201).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
