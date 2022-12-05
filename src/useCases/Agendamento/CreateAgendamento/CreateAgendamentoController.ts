import { NextFunction, Request, Response } from "express";
import { ICreateAgendamentoUseCase } from "./CreateAgendamentoUseCase";

export class CreateAgendamentoController {
  constructor(private createAgendamentoUseCase: ICreateAgendamentoUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { agendamentos, agendamento } =
        await this.createAgendamentoUseCase.execute(req.body);
      req.io.emit("create agendamento", agendamentos);
      // await req.producer.send({
      //   topic: process.env.KAFKA_TOPIC_PRODUCER || "",
      //   messages: [{ value: JSON.stringify(agendamento) }],
      // });
      res.status(201).json(agendamentos);
    } catch (err: any) {
      next(err);
    }
  }
}
