import { NextFunction, Request, Response } from "express";
import { IRemovePedidoUseCase } from "./RemovePedidoUseCase";

export class RemovePedidoController {
  constructor(private removePedidoUseCase: IRemovePedidoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidos = await this.removePedidoUseCase.execute(
        req.params.id,
        req.params.pacienteId
      );
      res.status(201).json(pedidos);
    } catch (err: any) {
      next(err);
    }
  }
}
