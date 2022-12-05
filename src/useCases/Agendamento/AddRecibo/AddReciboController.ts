import { NextFunction, Request, Response } from "express";
import { IAddReciboUseCase } from "./AddReciboUseCase";

export class AddReciboController {
  constructor(private addReciboUseCase: IAddReciboUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const recibos = await this.addReciboUseCase.execute(
        req.body,
        req.params.agendamentoId
      );
      res.status(201).json(recibos);
    } catch (err: any) {
      next(err);
    }
  }
}
