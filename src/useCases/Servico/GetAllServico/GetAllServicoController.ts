import { NextFunction, Request, Response } from "express";
import { IGetAllServicoUseCase } from "./GetAllServicoUseCase";

export class GetAllServicoController {
  constructor(private getAllServicoUseCase: IGetAllServicoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const servicos = await this.getAllServicoUseCase.execute();
      res.status(200).json(servicos);
    } catch (err: any) {
      next(err);
    }
  }
}
