import { GetAllAgendamentoUseCase } from "./../useCases/Agendamento/GetAllAgendamento/GetAllAgendamentoUseCase";
import { UpdateAgendamentoUseCase } from "./../useCases/Agendamento/UpdateAgendamento/UpdateAgendamentoUseCase";
import { AgendamentosRepository } from "./../repositories/AgendamentosRepository";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import Routes from "../routes/index.routes";
import { Server } from "socket.io";
import { createServer } from "http";
import { Kafka } from "kafkajs";
import { observabilityMiddleware } from "@doxa-code/observability";
import { format } from "date-fns";
import { createMetrics } from "DA-metrics";

const app = express();

config();

// const kafka = new Kafka({
//   clientId: process.env.KAFKA_CLIENT_ID || "kafka-client",
//   brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
//   retry: {
//     initialRetryTime: 300,
//   },
// });
// const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: process.env.KAFKA_CLIENT_ID || "" });

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

// const agendamentoRepository = new AgendamentosRepository();
// const updateAgendamentoUseCase = new UpdateAgendamentoUseCase(
//   agendamentoRepository
// );
// const getAllAgendamentoUseCase = new GetAllAgendamentoUseCase(
//   agendamentoRepository
// );

// producer.connect();
// consumer.connect().then(async () => {
//   consumer.subscribe({ topic: process.env.KAFKA_TOPIC_CONSUMER || "" });

//   await consumer.run({
//     eachMessage: async ({ message }) => {
//       const mensage = JSON.parse(message?.value?.toString() || "[]");
//       await updateAgendamentoUseCase.execute(mensage._id, {
//         status: mensage.status,
//       });
//       const agendamentos = await getAllAgendamentoUseCase.execute(
//         false,
//         format(new Date(), "yyyy-MM-dd")
//       );
//       io.emit("update agendamento", agendamentos);
//     },
//   });
// });

app.use((req, _res, next) => {
  req.io = io;
  // req.producer = producer;
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    exposedHeaders: "*",
  })
);
createMetrics(app, () => {
  app.use(Routes);
});

app.use((req, res) => {
  res.status(400).end();
});

export default server;
