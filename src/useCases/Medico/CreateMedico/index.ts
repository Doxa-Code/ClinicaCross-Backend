import { CreateMedicoController } from "./CreateMedicoController";
import { CreateMedicoUseCase } from "./CreateMedicoUseCase";
import { MedicoRepository } from "../../../repositories/MedicoRepository";

const medicoRepository = new MedicoRepository();
const createMedicoUseCase = new CreateMedicoUseCase(medicoRepository);
const createMedicoController = new CreateMedicoController(createMedicoUseCase);

export { createMedicoController }