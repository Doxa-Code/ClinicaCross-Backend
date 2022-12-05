import { NextFunction, Request, Response } from "express";
import { IGetHistoricoUseCase } from "./GetHistoricoUseCase";

export class GetHistoricoController {
  constructor(private getHistoricoUseCase: IGetHistoricoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.getHistoricoUseCase.execute(
        req.params.pacienteId
      );

      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
