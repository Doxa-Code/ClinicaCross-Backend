import { AgendamentosRepository } from "./../../../repositories/AgendamentosRepository";
import { S3 } from "aws-sdk";
import { DeletePacienteUseCase } from "./DeletePacienteUseCase";
import { DeletePacienteController } from "./DeletePacienteController";
import { PacienteRepository } from "../../../repositories/PacienteRepository";


const storage = new S3()
const pacienteRepository = new PacienteRepository()
const agendamentoRepository = new AgendamentosRepository()
const deletePacienteUseCase = new DeletePacienteUseCase(pacienteRepository, storage, agendamentoRepository)
const deletePacienteController = new DeletePacienteController(deletePacienteUseCase)

export { deletePacienteController }