import { NextFunction, Request, Response } from "express";
import { IGetAllFormaDePagamentoUseCase } from "./GetAllFormaDePagamentoUseCase";

export class GetAllFormaDePagamentoController {
  constructor(
    private getAllFormaDePagamentoUseCase: IGetAllFormaDePagamentoUseCase
  ) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const formadepagamentos =
        await this.getAllFormaDePagamentoUseCase.execute();
      res.status(200).json(formadepagamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
