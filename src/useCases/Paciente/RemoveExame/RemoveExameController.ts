import { NextFunction, Request, Response } from "express";
import { IRemoveExameUseCase } from "./RemoveExameUseCase";

export class RemoveExameController {
  constructor(private removeExameUseCase: IRemoveExameUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const exames = await this.removeExameUseCase.execute(
        req.params.id,
        req.params.pacienteId
      );
      res.status(201).json(exames);
    } catch (err: any) {
      next(err);
    }
  }
}
