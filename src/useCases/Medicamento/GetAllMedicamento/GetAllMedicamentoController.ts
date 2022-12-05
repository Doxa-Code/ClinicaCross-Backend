import { NextFunction, Request, Response } from "express";
import { IGetAllMedicamentoUseCase } from "./GetAllMedicamentoUseCase";

export class GetAllMedicamentoController {
  constructor(private getAllMedicamentoUseCase: IGetAllMedicamentoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const medicamentos = await this.getAllMedicamentoUseCase.execute();
      res.status(200).json(medicamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
