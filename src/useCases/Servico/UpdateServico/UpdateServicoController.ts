import { IUpdateServicoUseCase } from "./UpdateServicoUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdateServicoController {
  constructor(private updateServicoUseCase: IUpdateServicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.updateServicoUseCase.execute(req.body, { _id: id });
      res.status(200).json({ updated: true });
    } catch (err: any) {
      next(err);
    }
  }
}
