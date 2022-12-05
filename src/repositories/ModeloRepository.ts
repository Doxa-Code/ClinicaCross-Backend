import { Tipo } from "./../entities/Modelo";
import ModeloModel from "../schemas/ModeloSchema";
import { Modelo } from "../entities/Modelo";

export interface IModeloRepository {
  save(data: Modelo): Promise<Modelo>;
  getAllTypes(tipo: Tipo): Promise<Modelo[]>;
  getAll(): Promise<Modelo[]>;
  getOne(id: string): Promise<Modelo | null>;
  update(id: string, data: Modelo): Promise<Boolean>;
  delete(id: string): Promise<Boolean>;
}

export class ModeloRepository implements IModeloRepository {
  async save(data: Modelo) {
    const response = await ModeloModel.create(data);
    return response.toObject();
  }

  async getAll() {
    return await ModeloModel.find();
  }

  async getAllTypes(tipo: Tipo) {
    return await ModeloModel.find({ tipo });
  }

  async getOne(id: string) {
    const modelo = await ModeloModel.findById(id);
    if (!modelo) return null;
    return modelo?.toObject();
  }

  async update(id: string, data: Modelo) {
    const response = await ModeloModel.updateOne({ _id: id }, { $set: data });
    return response.nModified > 0;
  }

  async delete(id: string) {
    const { deletedCount } = await ModeloModel.deleteOne({ _id: id });
    if (!deletedCount) return false;
    return deletedCount > 0;
  }
}
