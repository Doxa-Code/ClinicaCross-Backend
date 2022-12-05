import { NextFunction, Request, Response } from "express";
import { IGetByIdUserUseCase } from "./GetByIdUserUseCase";

export class GetByIdUserController {
  constructor(private getByIdUserUseCase: IGetByIdUserUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.getByIdUserUseCase.execute(req.params.id);
      res.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }
}
