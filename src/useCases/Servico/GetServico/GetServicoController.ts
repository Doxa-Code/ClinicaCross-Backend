import { NextFunction, Request, Response } from "express";
import { IGetServicoUseCase } from "./GetServicoUseCase";

export class GetServicoController {
  constructor(private getServicoUseCase: IGetServicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const servicos = await this.getServicoUseCase.execute({ _id: id });
      res.status(200).json(servicos);
    } catch (err: any) {
      next(err);
    }
  }
}
