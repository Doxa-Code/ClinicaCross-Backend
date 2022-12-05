import { NextFunction, Request, Response } from "express";
import { IGetGuiaSADTUseCase } from "./GetGuiaSADTUseCase";

export class GetGuiaSADTController {
  constructor(private getGuiaSADTUseCase: IGetGuiaSADTUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const guia = await this.getGuiaSADTUseCase.execute(req.params.id);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(guia),
          "Content-Type": "application/pdf",
          "Content-disposition": `attachment;filename=guiaSADT-${req.params.id}.pdf`,
        })
        .end(guia);
    } catch (err: any) {
      next(err);
    }
  }
}
