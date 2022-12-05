import { ICreateServicoUseCase } from "./CreateServicoUseCase";
import { NextFunction, Request, Response } from "express";

export class CreateServicoController {
  constructor(private createServicoUseCase: ICreateServicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.createServicoUseCase.execute(req.body);
      res.status(201).json(response);
    } catch (err: any) {
      next(err);
    }
  }
}
