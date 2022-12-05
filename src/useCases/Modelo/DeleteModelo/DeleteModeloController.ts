import { Request, Response, NextFunction } from 'express'
import { IDeleteModeloUseCase } from './DeleteModeloUseCase'

export class DeleteModeloController {
  constructor (private deleteModeloUseCase: IDeleteModeloUseCase) {}

  async handle (req: Request, res: Response, next: NextFunction) {
    try {
      await this.deleteModeloUseCase.execute({ _id: req.params.id })
      res.status(200).json({ deleted: true })
    } catch (err: any) {
      next(err)
    }
  }
}
