import { NextFunction, Request, Response } from "express";
import { IGetPacienteUploaderUseCase } from "./GetPacienteUploaderUseCase";

export class GetPacienteUploaderController {
  constructor(
    private getPacienteUploaderUseCase: IGetPacienteUploaderUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pacientes = await this.getPacienteUploaderUseCase.execute(req.body);
      res.status(200).json(pacientes);
    } catch (err: any) {
      next(err);
    }
  }
}
