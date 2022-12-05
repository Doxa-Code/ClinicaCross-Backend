import { NextFunction, Request, Response } from "express";
import { IRemoveLaudoUseCase } from "./RemoveLaudoUseCase";

export class RemoveLaudoController {
  constructor(private removeLaudoUseCase: IRemoveLaudoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const laudos = await this.removeLaudoUseCase.execute(
        req.params.id,
        req.params.pacienteId
      );
      res.status(201).json(laudos);
    } catch (err: any) {
      next(err);
    }
  }
}
