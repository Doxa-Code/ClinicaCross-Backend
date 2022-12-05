import { ICreateFaturamentoUseCase } from "./CreateFaturamentoUseCase";
import { NextFunction, Request, Response } from "express";

export class CreateFaturamentoController {
  constructor(private createFaturamentoUseCase: ICreateFaturamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.createFaturamentoUseCase.execute(req.body);
      res.status(201).json(response);
    } catch (err: any) {
      next(err);
    }
  }
}
