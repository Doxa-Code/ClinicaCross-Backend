import { GetMedicoUploaderUseCase } from "./GetMedicoUploaderUseCase";
import { GetMedicoUploaderController } from "./GetMedicoUploaderController";
import { MedicoRepository } from "../../../repositories/MedicoRepository";

const medicoRepository = new MedicoRepository();
const getMedicoUploaderUseCase = new GetMedicoUploaderUseCase(medicoRepository);
const getMedicoUploaderController = new GetMedicoUploaderController(
  getMedicoUploaderUseCase
);

export { getMedicoUploaderController };
