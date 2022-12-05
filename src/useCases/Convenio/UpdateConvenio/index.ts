import { S3 } from "aws-sdk";
import { UpdateConvenioController } from "./UpdateConvenioController";
import { UpdateConvenioUseCase } from "./UpdateConvenioUseCase";
import { ConvenioRepository } from "../../../repositories/ConvenioRepository";

const storage = new S3();
const convenioRepository = new ConvenioRepository();
const updateConvenioUseCase = new UpdateConvenioUseCase(convenioRepository, storage);
const updateConvenioController = new UpdateConvenioController(updateConvenioUseCase);

export { updateConvenioController }