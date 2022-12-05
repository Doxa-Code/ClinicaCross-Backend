import { NextFunction, Request, Response } from "express";
import { IAddLaudoUseCase } from "./AddLaudoUseCase";

export class AddLaudoController {
  constructor(private addLaudoUseCase: IAddLaudoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const laudos = await this.addLaudoUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(laudos);
    } catch (err: any) {
      next(err);
    }
  }
}
