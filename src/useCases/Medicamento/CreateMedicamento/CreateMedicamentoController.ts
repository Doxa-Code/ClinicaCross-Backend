import { NextFunction, Request, Response } from "express";
import { ICreateMedicamentoUseCase } from "./CreateMedicamentoUseCase";

export class CreateMedicamentoController {
  constructor(private createMedicamentoUseCase: ICreateMedicamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const medicamento = await this.createMedicamentoUseCase.execute(req.body);
      res.status(201).json(medicamento);
    } catch (err: any) {
      next(err);
    }
  }
}
