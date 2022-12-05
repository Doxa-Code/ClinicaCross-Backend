import { NextFunction, Request, Response } from "express";
import { IAddPedidoUseCase } from "./AddPedidoUseCase";

export class AddPedidoController {
  constructor(private addPedidoUseCase: IAddPedidoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidos = await this.addPedidoUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(pedidos);
    } catch (err: any) {
      next(err);
    }
  }
}
