import { Request, Response, NextFunction } from 'express'
import { ICreateModeloUseCase } from './CreateModeloUseCase'

export class CreateModeloController {
  constructor (private createModeloUseCase: ICreateModeloUseCase) {}

  async handle (req: Request, res: Response, next: NextFunction) {
    try {
      const modelo = await this.createModeloUseCase.execute(req.body)
      res.status(201).json(modelo)
    } catch (err: any) {
      next(err)
    }
  }
}
