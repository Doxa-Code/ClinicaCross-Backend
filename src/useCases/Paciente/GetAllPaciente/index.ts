import { GetAllPacienteUseCase } from "./GetAllPacienteUseCase";
import { GetAllPacienteController } from "./GetAllPacienteController";
import { PacienteRepository } from "../../../repositories/PacienteRepository";


const pacienteRepository = new PacienteRepository()
const getAllPacienteUseCase = new GetAllPacienteUseCase(pacienteRepository)
const getAllPacienteController = new GetAllPacienteController(getAllPacienteUseCase)

export { getAllPacienteController }