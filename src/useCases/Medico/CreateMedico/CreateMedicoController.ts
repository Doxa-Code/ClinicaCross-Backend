import { ICreateMedicoUseCase } from "./CreateMedicoUseCase";
import { NextFunction, Request, Response } from "express";

export class CreateMedicoController {
  constructor(private createMedicoUseCase: ICreateMedicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.createMedicoUseCase.execute(req.body);
      res.status(201).json(response);
    } catch (err: any) {
      next(err);
    }
  }
}
