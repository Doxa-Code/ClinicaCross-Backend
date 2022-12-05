import { NextFunction, Request, Response } from "express";
import { IUpdateGrupoUseCase } from "./UpdateGrupoUseCase";

export class UpdateGrupoController {
  constructor(private updateGrupoCase: IUpdateGrupoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateGrupoCase.execute(req.params.id, req.body);
      res.status(201).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
