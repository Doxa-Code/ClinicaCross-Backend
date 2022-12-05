import { Request, Response, NextFunction } from 'express'
import { IGetByIdModeloUseCase } from './GetByIdModeloUseCase'

export class GetByIdModeloController {
  constructor (private getByIdModeloUseCase: IGetByIdModeloUseCase) {}

  async handle (req: Request, res: Response, next: NextFunction) {
    try {
      const modelo = await this.getByIdModeloUseCase.execute(req.params.id)
      res.status(200).json(modelo)
    } catch (err: any) {
      next(err)
    }
  }
}
