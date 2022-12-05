import { NextFunction, Request, Response } from "express";
import { IRemoveReceitaUseCase } from "./RemoveReceitaUseCase";

export class RemoveReceitaController {
  constructor(private removeReceitaUseCase: IRemoveReceitaUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const receitas = await this.removeReceitaUseCase.execute(
        req.params.id,
        req.params.pacienteId
      );
      res.status(201).json(receitas);
    } catch (err: any) {
      next(err);
    }
  }
}
