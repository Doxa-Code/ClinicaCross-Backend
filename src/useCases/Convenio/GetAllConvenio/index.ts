import { GetAllConvenioUseCase } from "./GetAllConvenioUseCase";
import { GetAllConvenioController } from "./GetAllConvenioController";
import { ConvenioRepository } from "../../../repositories/ConvenioRepository";

const convenioRepository = new ConvenioRepository();
const getAllConvenioUseCase = new GetAllConvenioUseCase(convenioRepository);
const getAllConvenioController = new GetAllConvenioController(
  getAllConvenioUseCase
);

export { getAllConvenioController };
