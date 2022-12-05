import { SearchPacienteUseCase } from "./SearchPacienteUseCase";
import { SearchPacienteController } from "./SearchPacienteController";
import { PacienteRepository } from "../../../repositories/PacienteRepository";


const pacienteRepository = new PacienteRepository()
const searchPacienteUseCase = new SearchPacienteUseCase(pacienteRepository)
const searchPacienteController = new SearchPacienteController(searchPacienteUseCase)

export { searchPacienteController }