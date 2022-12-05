import { NextFunction, Request, Response } from "express";
import { IDeleteUnidadeMedidaUseCase } from "./DeleteUnidadeMedidaUseCase";

export class DeleteUnidadeMedidaController {
  constructor(
    private deleteUnidadeMedidaUseCase: IDeleteUnidadeMedidaUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteUnidadeMedidaUseCase.execute({ _id: id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
