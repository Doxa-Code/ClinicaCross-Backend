import { Tipo } from "./../../../entities/Modelo";
import { Modelo } from "../../../entities/Modelo";
import { IModeloRepository } from "../../../repositories/ModeloRepository";

export interface IGetAllTypesModeloUseCase {
  execute(tipo: Tipo): Promise<Omit<Modelo, "password">[]>;
}

export class GetAllTypesModeloUseCase implements IGetAllTypesModeloUseCase {
  constructor(private modelosRepository: IModeloRepository) {}

  async execute(tipo: Tipo) {
    const modelos = await this.modelosRepository.getAllTypes(tipo);
    if (!modelos) {
      throw new Error(
        "Houve um erro ao buscar os dados! Tente novamente mais tarde!"
      );
    }
    return modelos;
  }
}
