import { NextFunction, Request, Response } from "express";
import { IGetByIdGrupoUseCase } from "./GetByIdGrupoUseCase";

export class GetByIdGrupoController {
  constructor(private getByIdGrupoUseCase: IGetByIdGrupoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const grupo = await this.getByIdGrupoUseCase.execute(req.params.id);
      res.status(200).json(grupo);
    } catch (err: any) {
      next(err);
    }
  }
}
