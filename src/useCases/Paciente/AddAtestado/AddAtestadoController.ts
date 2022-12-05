import { NextFunction, Request, Response } from "express";
import { IAddAtestadoUseCase } from "./AddAtestadoUseCase";

export class AddAtestadoController {
  constructor(private addAtestadoUseCase: IAddAtestadoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const atestados = await this.addAtestadoUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(atestados);
    } catch (err: any) {
      next(err);
    }
  }
}
