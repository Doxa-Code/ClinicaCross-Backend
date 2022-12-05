import { UpdateMedicoController } from "./UpdateMedicoController";
import { UpdateMedicoUseCase } from "./UpdateMedicoUseCase";
import { MedicoRepository } from "../../../repositories/MedicoRepository";

const medicoRepository = new MedicoRepository();
const updateMedicoUseCase = new UpdateMedicoUseCase(medicoRepository);
const updateMedicoController = new UpdateMedicoController(updateMedicoUseCase);

export { updateMedicoController }