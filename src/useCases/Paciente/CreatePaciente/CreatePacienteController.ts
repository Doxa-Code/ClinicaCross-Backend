import { ICreatePacienteUseCase } from "./CreatePacienteUseCase";
import { NextFunction, Request, Response } from "express";

export class CreatePacienteController {
  constructor(private createPacienteUseCase: ICreatePacienteUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const file: any = req.file;
      const response = await this.createPacienteUseCase.execute(
        file?.location ? { thumbnail: file?.location, ...req.body } : req.body
      );
      res.status(201).json(response);
    } catch (err: any) {
      next(err);
    }
  }
}
