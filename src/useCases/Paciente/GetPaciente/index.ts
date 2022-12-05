import { GetPacienteUseCase } from "./GetPacienteUseCase";
import { GetPacienteController } from "./GetPacienteController";
import { PacienteRepository } from "../../../repositories/PacienteRepository";


const pacienteRepository = new PacienteRepository()
const getPacienteUseCase = new GetPacienteUseCase(pacienteRepository)
const getPacienteController = new GetPacienteController(getPacienteUseCase)

export { getPacienteController }