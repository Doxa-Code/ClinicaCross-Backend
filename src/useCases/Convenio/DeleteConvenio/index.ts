import { DeleteConvenioUseCase } from "./DeleteConvenioUseCase";
import { DeleteConvenioController } from "./DeleteConvenioController";
import { ConvenioRepository } from "../../../repositories/ConvenioRepository";


const convenioRepository = new ConvenioRepository()
const deleteConvenioUseCase = new DeleteConvenioUseCase(convenioRepository)
const deleteConvenioController = new DeleteConvenioController(deleteConvenioUseCase)

export { deleteConvenioController }