import { S3 } from "aws-sdk";
import { UpdatePacienteController } from "./UpdatePacienteController";
import { UpdatePacienteUseCase } from "./UpdatePacienteUseCase";
import { PacienteRepository } from "../../../repositories/PacienteRepository";

const storage = new S3();
const pacienteRepository = new PacienteRepository();
const updatePacienteUseCase = new UpdatePacienteUseCase(pacienteRepository, storage);
const updatePacienteController = new UpdatePacienteController(updatePacienteUseCase);

export { updatePacienteController }