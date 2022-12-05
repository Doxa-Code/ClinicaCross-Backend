import { NextFunction, Request, Response } from "express";
import { IRemoveReciboUseCase } from "./RemoveReciboUseCase";

export class RemoveReciboController {
  constructor(private removeReciboUseCase: IRemoveReciboUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const recibos = await this.removeReciboUseCase.execute(
        req.params.id,
        req.params.agendamentoId
      );
      res.status(201).json(recibos);
    } catch (err: any) {
      next(err);
    }
  }
}
