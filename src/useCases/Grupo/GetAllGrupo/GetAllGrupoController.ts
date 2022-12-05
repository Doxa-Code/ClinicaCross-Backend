import { NextFunction, Request, Response } from "express";
import { IGetAllGrupoUseCase } from "./GetAllGrupoUseCase";

export class GetAllGrupoController {
  constructor(private getAllGrupoUseCase: IGetAllGrupoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const grupos = await this.getAllGrupoUseCase.execute();
      res.status(200).json(grupos);
    } catch (err: any) {
      next(err);
    }
  }
}
