import { NextFunction, Request, Response } from "express";
import { ICreateFormaDePagamentoUseCase } from "./CreateFormaDePagamentoUseCase";

export class CreateFormaDePagamentoController {
  constructor(
    private createFormaDePagamentoUseCase: ICreateFormaDePagamentoUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const formadepagamento = await this.createFormaDePagamentoUseCase.execute(
        req.body
      );
      res.status(201).json(formadepagamento);
    } catch (err: any) {
      next(err);
    }
  }
}
