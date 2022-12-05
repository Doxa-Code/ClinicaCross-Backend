import { NextFunction, Request, Response } from "express";
import { IGetByIdMedicamentoUseCase } from "./GetByIdMedicamentoUseCase";

export class GetByIdMedicamentoController {
  constructor(private getByIdMedicamentoUseCase: IGetByIdMedicamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const medicamento = await this.getByIdMedicamentoUseCase.execute(
        req.params.id
      );
      res.status(200).json(medicamento);
    } catch (err: any) {
      next(err);
    }
  }
}
