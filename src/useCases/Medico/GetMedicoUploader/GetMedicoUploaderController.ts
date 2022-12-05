import { NextFunction, Request, Response } from "express";
import { IGetMedicoUploaderUseCase } from "./GetMedicoUploaderUseCase";

export class GetMedicoUploaderController {
  constructor(private getMedicoUploaderUseCase: IGetMedicoUploaderUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo } = req.params;
      const medicos = await this.getMedicoUploaderUseCase.execute({ codigo });
      res.status(200).json(medicos);
    } catch (err: any) {
      next(err);
    }
  }
}
