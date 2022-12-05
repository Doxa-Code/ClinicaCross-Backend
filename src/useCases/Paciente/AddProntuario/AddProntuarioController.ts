import { NextFunction, Request, Response } from "express";
import { IAddProntuarioUseCase } from "./AddProntuarioUseCase";

export class AddProntuarioController {
  constructor(private addProntuarioUseCase: IAddProntuarioUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const prontuarios = await this.addProntuarioUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(prontuarios);
    } catch (err: any) {
      next(err);
    }
  }
}
