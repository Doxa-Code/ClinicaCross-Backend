import { NextFunction, Request, Response } from "express";
import { IGetByIdProcedimentoUseCase } from "./GetByIdProcedimentoUseCase";

export class GetByIdProcedimentoController {
  constructor(
    private getByIdProcedimentoUseCase: IGetByIdProcedimentoUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const procedimento = await this.getByIdProcedimentoUseCase.execute(
        req.params.id
      );
      res.status(200).json(procedimento);
    } catch (err: any) {
      next(err);
    }
  }
}
