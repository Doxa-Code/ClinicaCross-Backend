import { CreatePacienteController } from "./CreatePacienteController";
import { CreatePacienteUseCase } from "./CreatePacienteUseCase";
import { PacienteRepository } from "../../../repositories/PacienteRepository";

const pacienteRepository = new PacienteRepository();
const createPacienteUseCase = new CreatePacienteUseCase(pacienteRepository);
const createPacienteController = new CreatePacienteController(createPacienteUseCase);

export { createPacienteController }