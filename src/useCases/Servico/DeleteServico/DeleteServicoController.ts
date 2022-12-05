import { NextFunction, Request, Response } from "express";
import { IDeleteServicoUseCase } from "./DeleteServicoUseCase";

export class DeleteServicoController {
  constructor(private deleteServicoUseCase: IDeleteServicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteServicoUseCase.execute({ _id: id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
