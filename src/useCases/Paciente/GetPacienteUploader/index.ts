import { GetPacienteUploaderUseCase } from "./GetPacienteUploaderUseCase";
import { GetPacienteUploaderController } from "./GetPacienteUploaderController";
import { PacienteRepository } from "../../../repositories/PacienteRepository";

const pacienteRepository = new PacienteRepository();
const getPacienteUploaderUseCase = new GetPacienteUploaderUseCase(
  pacienteRepository
);
const getPacienteUploaderController = new GetPacienteUploaderController(
  getPacienteUploaderUseCase
);

export { getPacienteUploaderController };
