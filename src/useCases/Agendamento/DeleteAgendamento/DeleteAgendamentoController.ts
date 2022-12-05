import { NextFunction, Request, Response } from "express";
import { IDeleteAgendamentoUseCase } from "./DeleteAgendamentoUseCase";

export class DeleteAgendamentoController {
  constructor(private deleteAgendamentoUseCase: IDeleteAgendamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteAgendamentoUseCase.execute({ _id: req.params.id });
      res.status(200).json({ deleted: true });
    } catch (err: any) {
      next(err);
    }
  }
}
