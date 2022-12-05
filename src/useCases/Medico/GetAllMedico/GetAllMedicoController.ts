import { NextFunction, Request, Response } from "express";
import { IGetAllMedicoUseCase } from "./GetAllMedicoUseCase";

export class GetAllMedicoController {
  constructor(private getAllMedicoUseCase: IGetAllMedicoUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const medicos = await this.getAllMedicoUseCase.execute();
      res.status(200).json(medicos);
    } catch (err: any) {
      next(err);
    }
  }
}
