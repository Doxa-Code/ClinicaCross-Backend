import { NextFunction, Request, Response } from "express";
import { ISearchPacienteUseCase } from "./SearchPacienteUseCase";

export class SearchPacienteController {
  constructor(private searchPacienteUseCase: ISearchPacienteUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pacientes = await this.searchPacienteUseCase.execute(
        String(req.query.q) || "",
        Number(req.query.limit) || 5,
        Number(req.query.page) || 1,
        Boolean(req.query.noCount as string) || false
      );
      res.status(200).json(pacientes);
    } catch (err: any) {
      next(err);
    }
  }
}
