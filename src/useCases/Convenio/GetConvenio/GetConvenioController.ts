import { NextFunction, Request, Response } from "express";
import { IGetConvenioUseCase } from "./GetConvenioUseCase";

export class GetConvenioController {
  constructor(private getConvenioUseCase: IGetConvenioUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const convenios = await this.getConvenioUseCase.execute({ _id: id });
      res.status(200).json(convenios);
    } catch (err: any) {
      next(err);
    }
  }
}
