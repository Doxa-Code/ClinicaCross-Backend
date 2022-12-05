import { Tipo } from "./../../../entities/Modelo";
import { Request, Response, NextFunction } from "express";
import { IGetAllTypesModeloUseCase } from "./GetAllTypesModeloUseCase";

export class GetAllTypesModeloController {
  constructor(private getAllTypesModeloUseCase: IGetAllTypesModeloUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const modelos = await this.getAllTypesModeloUseCase.execute(
        req.query.tipo as Tipo
      );
      res.status(200).json(modelos);
    } catch (err: any) {
      next(err);
    }
  }
}
