import { NextFunction, Request, Response } from "express";
import { IGetMedicoUseCase } from "./GetMedicoUseCase";

export class GetMedicoController {
  constructor(private getMedicoUseCase: IGetMedicoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const medicos = await this.getMedicoUseCase.execute({ _id: id });
      res.status(200).json(medicos);
    } catch (err: any) {
      next(err);
    }
  }
}
