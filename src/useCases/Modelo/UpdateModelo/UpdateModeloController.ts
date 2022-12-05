import { Request, Response, NextFunction } from 'express'
import { IUpdateModeloUseCase } from './UpdateModeloUseCase'

export class UpdateModeloController {
  constructor (private updateModeloCase: IUpdateModeloUseCase) {}

  async handle (req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateModeloCase.execute(req.params.id, req.body)
      res.status(201).json({ updated: true })
    } catch (err: any) {
      next(err)
    }
  }
}
