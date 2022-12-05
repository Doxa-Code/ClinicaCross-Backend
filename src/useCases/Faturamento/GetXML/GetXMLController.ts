import { NextFunction, Request, Response } from "express";
import { IGetGetXMLUseCase } from "./GetXMLUseCase";

export class GetGetXMLController {
  constructor(private getGetXMLUseCase: IGetGetXMLUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const faturamento = await this.getGetXMLUseCase.execute(req.params.id);
      res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(faturamento),
          "Content-Type": "application/xml",
          "Content-disposition": `attachment;filename=faturamento-${req.params.id}.xml`,
        })
        .end(faturamento);
    } catch (err: any) {
      next(err);
    }
  }
}
