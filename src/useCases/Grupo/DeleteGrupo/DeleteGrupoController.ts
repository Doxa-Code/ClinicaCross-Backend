import { NextFunction, Request, Response } from "express";
import { IDeleteGrupoUseCase } from "./DeleteGrupoUseCase";

export class DeleteGrupoController {
  constructor(private deleteGrupoUseCase: IDeleteGrupoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteGrupoUseCase.execute({ _id: req.params.id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
