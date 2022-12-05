import { ICreateConvenioUseCase } from "./CreateConvenioUseCase";
import { NextFunction, Request, Response } from "express";

export class CreateConvenioController {
  constructor(private createConvenioUseCase: ICreateConvenioUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const file: any = req.file;
      const response = await this.createConvenioUseCase.execute(
        file?.location ? { thumbnail: file?.location, ...req.body } : req.body
      );
      res.status(201).json(response);
    } catch (err: any) {
      next(err);
    }
  }
}
