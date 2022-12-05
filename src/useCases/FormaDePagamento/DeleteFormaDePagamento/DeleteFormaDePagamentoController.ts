import { NextFunction, Request, Response } from "express";
import { IDeleteFormaDePagamentoUseCase } from "./DeleteFormaDePagamentoUseCase";

export class DeleteFormaDePagamentoController {
  constructor(
    private deleteFormaDePagamentoUseCase: IDeleteFormaDePagamentoUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteFormaDePagamentoUseCase.execute({ _id: req.params.id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
