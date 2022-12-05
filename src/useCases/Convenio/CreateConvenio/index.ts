import { CreateConvenioController } from "./CreateConvenioController";
import { CreateConvenioUseCase } from "./CreateConvenioUseCase";
import { ConvenioRepository } from "../../../repositories/ConvenioRepository";

const convenioRepository = new ConvenioRepository();
const createConvenioUseCase = new CreateConvenioUseCase(convenioRepository);
const createConvenioController = new CreateConvenioController(createConvenioUseCase);

export { createConvenioController }