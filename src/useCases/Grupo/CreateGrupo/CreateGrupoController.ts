import { NextFunction, Request, Response } from "express";
import { ICreateGrupoUseCase } from "./CreateGrupoUseCase";

export class CreateGrupoController {
  constructor(private createGrupoUseCase: ICreateGrupoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const grupo = await this.createGrupoUseCase.execute(req.body);
      res.status(201).json(grupo);
    } catch (err: any) {
      next(err);
    }
  }
}
