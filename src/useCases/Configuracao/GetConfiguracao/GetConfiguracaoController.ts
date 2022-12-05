import { NextFunction, Request, Response } from "express";
import { IGetConfiguracaoUseCase } from "./GetConfiguracaoUseCase";

export class GetConfiguracaoController {
  constructor(private getConfiguracaoUseCase: IGetConfiguracaoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const configuracao = await this.getConfiguracaoUseCase.execute();
      res.status(200).json(configuracao);
    } catch (err: any) {
      next(err);
    }
  }
}
