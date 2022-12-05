import { GetConvenioUploaderUseCase } from "./GetConvenioUploaderUseCase";
import { GetConvenioUploaderController } from "./GetConvenioUploaderController";
import { ConvenioRepository } from "../../../repositories/ConvenioRepository";

const convenioRepository = new ConvenioRepository();
const getConvenioUploaderUseCase = new GetConvenioUploaderUseCase(
  convenioRepository
);
const getConvenioUploaderController = new GetConvenioUploaderController(
  getConvenioUploaderUseCase
);

export { getConvenioUploaderController };
