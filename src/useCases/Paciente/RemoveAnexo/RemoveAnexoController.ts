import { NextFunction, Request, Response } from "express";
import { IRemoveAnexoUseCase } from "./RemoveAnexoUseCase";

export class RemoveAnexoController {
  constructor(private removeAnexoUseCase: IRemoveAnexoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const anexos = await this.removeAnexoUseCase.execute(
        req.params.id,
        req.params.pacienteId
      );
      res.status(201).json(anexos);
    } catch (err: any) {
      next(err);
    }
  }
}
