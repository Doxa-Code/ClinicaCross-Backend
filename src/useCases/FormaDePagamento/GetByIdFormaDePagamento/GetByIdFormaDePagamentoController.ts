import { NextFunction, Request, Response } from "express";
import { IGetByIdFormaDePagamentoUseCase } from "./GetByIdFormaDePagamentoUseCase";

export class GetByIdFormaDePagamentoController {
  constructor(
    private getByIdFormaDePagamentoUseCase: IGetByIdFormaDePagamentoUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const formadepagamento =
        await this.getByIdFormaDePagamentoUseCase.execute(req.params.id);
      res.status(200).json(formadepagamento);
    } catch (err: any) {
      next(err);
    }
  }
}
