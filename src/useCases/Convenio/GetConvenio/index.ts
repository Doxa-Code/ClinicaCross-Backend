import { GetConvenioUseCase } from "./GetConvenioUseCase";
import { GetConvenioController } from "./GetConvenioController";
import { ConvenioRepository } from "../../../repositories/ConvenioRepository";


const convenioRepository = new ConvenioRepository()
const getConvenioUseCase = new GetConvenioUseCase(convenioRepository)
const getConvenioController = new GetConvenioController(getConvenioUseCase)

export { getConvenioController }