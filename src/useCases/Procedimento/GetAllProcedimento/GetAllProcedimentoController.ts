import { NextFunction, Request, Response } from "express";
import { IGetAllProcedimentoUseCase } from "./GetAllProcedimentoUseCase";

export class GetAllProcedimentoController {
  constructor(private getAllProcedimentoUseCase: IGetAllProcedimentoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const procedimentos = await this.getAllProcedimentoUseCase.execute();
      res.status(200).json(procedimentos);
    } catch (err: any) {
      next(err);
    }
  }
}
