import { IUpdateUnidadeMedidaUseCase } from "./UpdateUnidadeMedidaUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdateUnidadeMedidaController {
  constructor(
    private updateUnidadeMedidaUseCase: IUpdateUnidadeMedidaUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.updateUnidadeMedidaUseCase.execute(req.body, { _id: id });
      res.status(200).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
