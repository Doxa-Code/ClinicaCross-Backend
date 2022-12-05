import { NextFunction, Request, Response } from "express";
import { IGetAllConvenioUseCase } from "./GetAllConvenioUseCase";

export class GetAllConvenioController {
  constructor(private getAllConvenioUseCase: IGetAllConvenioUseCase) {}

  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const convenios = await this.getAllConvenioUseCase.execute();
      res.status(200).json(convenios);
    } catch (err: any) {
      next(err);
    }
  }
}
