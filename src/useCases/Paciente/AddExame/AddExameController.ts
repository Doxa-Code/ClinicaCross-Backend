import { NextFunction, Request, Response } from "express";
import { IAddExameUseCase } from "./AddExameUseCase";

export class AddExameController {
  constructor(private addExameUseCase: IAddExameUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const exames = await this.addExameUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(exames);
    } catch (err: any) {
      next(err);
    }
  }
}
