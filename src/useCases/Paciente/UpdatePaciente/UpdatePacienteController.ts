import { IUpdatePacienteUseCase } from "./UpdatePacienteUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdatePacienteController {
  constructor(private updatePacienteUseCase: IUpdatePacienteUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const file: any = req.file;
      const paciente = await this.updatePacienteUseCase.execute(
        file?.location ? { thumbnail: file?.location, ...req.body } : req.body,
        { _id: id }
      );
      res.status(200).json(paciente);
    } catch (err: any) {
      next(err);
    }
  }
}
