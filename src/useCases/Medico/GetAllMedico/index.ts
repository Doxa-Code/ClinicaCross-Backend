import { GetAllMedicoUseCase } from "./GetAllMedicoUseCase";
import { GetAllMedicoController } from "./GetAllMedicoController";
import { MedicoRepository } from "../../../repositories/MedicoRepository";


const medicoRepository = new MedicoRepository()
const getAllMedicoUseCase = new GetAllMedicoUseCase(medicoRepository)
const getAllMedicoController = new GetAllMedicoController(getAllMedicoUseCase)

export { getAllMedicoController }