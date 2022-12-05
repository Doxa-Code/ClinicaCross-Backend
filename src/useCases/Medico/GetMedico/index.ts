import { GetMedicoUseCase } from "./GetMedicoUseCase";
import { GetMedicoController } from "./GetMedicoController";
import { MedicoRepository } from "../../../repositories/MedicoRepository";


const medicoRepository = new MedicoRepository()
const getMedicoUseCase = new GetMedicoUseCase(medicoRepository)
const getMedicoController = new GetMedicoController(getMedicoUseCase)

export { getMedicoController }