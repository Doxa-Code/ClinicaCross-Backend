import { NextFunction, Request, Response } from "express";
import { IDeleteFaturamentoUseCase } from "./DeleteFaturamentoUseCase";

export class DeleteFaturamentoController {
  constructor(private deleteFaturamentoUseCase: IDeleteFaturamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteFaturamentoUseCase.execute({ _id: id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
