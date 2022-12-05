import { NextFunction, Request, Response } from "express";
import { IGetAllUnidadeMedidaUseCase } from "./GetAllUnidadeMedidaUseCase";

export class GetAllUnidadeMedidaController {
  constructor(
    private getAllUnidadeMedidaUseCase: IGetAllUnidadeMedidaUseCase
  ) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const unidadeMedidas = await this.getAllUnidadeMedidaUseCase.execute();
      res.status(200).json(unidadeMedidas);
    } catch (err: any) {
      next(err);
    }
  }
}
