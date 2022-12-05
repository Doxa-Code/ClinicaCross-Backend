import { IUpdateConvenioUseCase } from "./UpdateConvenioUseCase";
import { NextFunction, Request, Response } from "express";

export class UpdateConvenioController {
  constructor(private updateConvenioUseCase: IUpdateConvenioUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const file: any = req.file;
      const convenio = await this.updateConvenioUseCase.execute(
        file?.location ? { thumbnail: file?.location, ...req.body } : req.body,
        { _id: id }
      );
      res.status(200).json(convenio);
    } catch (err: any) {
      next(err);
    }
  }
}
