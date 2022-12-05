import { NextFunction, Request, Response } from "express";
import { ICreateProcedimentoUseCase } from "./CreateProcedimentoUseCase";

export class CreateProcedimentoController {
  constructor(private createProcedimentoUseCase: ICreateProcedimentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const procedimento = await this.createProcedimentoUseCase.execute(
        req.body
      );
      res.status(201).json(procedimento);
    } catch (err: any) {
      next(err);
    }
  }
}
