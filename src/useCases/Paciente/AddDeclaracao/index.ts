import { PacienteRepository } from "../../../repositories/PacienteRepository";
import { AddDeclaracaoUseCase } from "./AddDeclaracaoUseCase";
import { AddDeclaracaoController } from "./AddDeclaracaoController";

const pacientesRepository = new PacienteRepository();
const addDeclaracaoUseCase = new AddDeclaracaoUseCase(pacientesRepository);
const addDeclaracaoController = new AddDeclaracaoController(
  addDeclaracaoUseCase
);

export { addDeclaracaoController };
