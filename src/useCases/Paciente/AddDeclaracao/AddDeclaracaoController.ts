import { NextFunction, Request, Response } from "express";
import { IAddDeclaracaoUseCase } from "./AddDeclaracaoUseCase";

export class AddDeclaracaoController {
  constructor(private addDeclaracaoUseCase: IAddDeclaracaoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const declaracaos = await this.addDeclaracaoUseCase.execute(
        req.body,
        req.params.pacienteId
      );
      res.status(201).json(declaracaos);
    } catch (err: any) {
      next(err);
    }
  }
}
