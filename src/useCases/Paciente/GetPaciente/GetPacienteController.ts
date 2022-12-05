import { NextFunction, Request, Response } from "express";
import { IGetPacienteUseCase } from "./GetPacienteUseCase";

export class GetPacienteController {
  constructor(private getPacienteUseCase: IGetPacienteUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const pacientes = await this.getPacienteUseCase.execute({ _id: id });
      res.status(200).json(pacientes);
    } catch (err: any) {
      next(err);
    }
  }
}
