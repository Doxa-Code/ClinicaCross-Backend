import { ICreateUnidadeMedidaUseCase } from "./CreateUnidadeMedidaUseCase";
import { NextFunction, Request, Response } from "express";

export class CreateUnidadeMedidaController {
  constructor(
    private createUnidadeMedidaUseCase: ICreateUnidadeMedidaUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.createUnidadeMedidaUseCase.execute(req.body);
      res.status(201).json(response);
    } catch (err: any) {
      next(err);
    }
  }
}
