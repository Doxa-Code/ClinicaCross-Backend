import { NextFunction, Request, Response } from "express";
import { IDeletePacienteUseCase } from "./DeletePacienteUseCase";

export class DeletePacienteController {
  constructor(private deletePacienteUseCase: IDeletePacienteUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deletePacienteUseCase.execute({ _id: id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
