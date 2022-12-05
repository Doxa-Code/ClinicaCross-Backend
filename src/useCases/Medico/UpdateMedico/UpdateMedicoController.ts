import { IUpdateMedicoUseCase } from "./UpdateMedicoUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdateMedicoController {
  constructor(private updateMedicoUseCase: IUpdateMedicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const medico = await this.updateMedicoUseCase.execute(req.body, {
        _id: id,
      });
      res.status(200).json(medico);
    } catch (err: any) {
      next(err);
    }
  }
}
