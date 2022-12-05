import { NextFunction, Request, Response } from "express";
import { IGetAllFaturarUseCase } from "./GetAllFaturarUseCase";

export class GetAllFaturarController {
  constructor(private getAllFaturarUseCase: IGetAllFaturarUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const agendamentos = await this.getAllFaturarUseCase.execute();
      res.status(200).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
