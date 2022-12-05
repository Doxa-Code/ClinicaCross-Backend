import { ModeloRepository } from "../../../repositories/ModeloRepository";
import { GetAllTypesModeloUseCase } from "./GetAllTypesModeloUseCase";
import { GetAllTypesModeloController } from "./GetAllTypesModeloController";

const modelosRepository = new ModeloRepository();
const getAllTypesModeloUseCase = new GetAllTypesModeloUseCase(
  modelosRepository
);
const getAllTypesModeloController = new GetAllTypesModeloController(
  getAllTypesModeloUseCase
);

export { getAllTypesModeloController };
