import { NextFunction, Request, Response } from "express";
import { IAddAnexoUseCase } from "./AddAnexoUseCase";

export class AddAnexoController {
  constructor(private addAnexoUseCase: IAddAnexoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const file: any = req.file;
      const anexos = await this.addAnexoUseCase.execute(
        { data: file?.location, ...req.body },
        req.params.pacienteId
      );
      res.status(201).json(anexos);
    } catch (err: any) {
      next(err);
    }
  }
}
