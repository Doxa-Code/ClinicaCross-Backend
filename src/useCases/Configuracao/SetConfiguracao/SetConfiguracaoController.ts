import { ISetConfiguracaoUseCase } from "./SetConfiguracaoUseCase";
import { NextFunction, Request, Response } from "express";

export class SetConfiguracaoController {
  constructor(private setConfiguracaoUseCase: ISetConfiguracaoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.setConfiguracaoUseCase.execute(req.body);
      res.status(200).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
