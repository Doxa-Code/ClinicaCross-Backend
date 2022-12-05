import { DeleteMedicoUseCase } from "./DeleteMedicoUseCase";
import { DeleteMedicoController } from "./DeleteMedicoController";
import { MedicoRepository } from "../../../repositories/MedicoRepository";


const medicoRepository = new MedicoRepository()
const deleteMedicoUseCase = new DeleteMedicoUseCase(medicoRepository)
const deleteMedicoController = new DeleteMedicoController(deleteMedicoUseCase)

export { deleteMedicoController }