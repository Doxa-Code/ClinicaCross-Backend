import { NextFunction, Request, Response } from "express";
import { IAddReceitaUseCase } from "./AddReceitaUseCase";

export class AddReceitaController {
  constructor(private addReceitaUseCase: IAddReceitaUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const receitas = await this.addReceitaUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(receitas);
    } catch (err: any) {
      next(err);
    }
  }
}
