import { NextFunction, Request, Response } from "express";
import { IGetAllPacienteUseCase } from "./GetAllPacienteUseCase";

export class GetAllPacienteController {
  constructor(private getAllPacienteUseCase: IGetAllPacienteUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pacientes = await this.getAllPacienteUseCase.execute(
        Number(req.query.limit) || 100,
        Number(req.query.page) || 1
      );
      res.status(200).json(pacientes);
    } catch (err: any) {
      next(err);
    }
  }
}
