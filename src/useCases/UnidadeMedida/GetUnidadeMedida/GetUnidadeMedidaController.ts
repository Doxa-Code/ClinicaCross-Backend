import { NextFunction, Request, Response } from "express";
import { IGetUnidadeMedidaUseCase } from "./GetUnidadeMedidaUseCase";

export class GetUnidadeMedidaController {
  constructor(private getUnidadeMedidaUseCase: IGetUnidadeMedidaUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const unidadeMedidas = await this.getUnidadeMedidaUseCase.execute({
        _id: id,
      });
      res.status(200).json(unidadeMedidas);
    } catch (err: any) {
      next(err);
    }
  }
}
