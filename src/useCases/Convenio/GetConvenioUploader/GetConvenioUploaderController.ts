import { NextFunction, Request, Response } from "express";
import { IGetConvenioUploaderUseCase } from "./GetConvenioUploaderUseCase";

export class GetConvenioUploaderController {
  constructor(
    private getConvenioUploaderUseCase: IGetConvenioUploaderUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo } = req.params;
      const convenios = await this.getConvenioUploaderUseCase.execute({
        codigo,
      });
      res.status(200).json(convenios);
    } catch (err: any) {
      next(err);
    }
  }
}
