import { NextFunction, Request, Response } from "express";
import { IDeleteConvenioUseCase } from "./DeleteConvenioUseCase";

export class DeleteConvenioController {
  constructor(private deleteConvenioUseCase: IDeleteConvenioUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.deleteConvenioUseCase.execute({ _id: id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
