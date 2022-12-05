import UnidadeMedidaModel, { UnidadeMedidaDocument } from "./../schemas/UnidadeMedidaSchema";
import { UnidadeMedida } from "../entities/UnidadeMedida";
import { FilterQuery } from "mongoose";

export interface IUnidadeMedidaRepository {
  index(): Promise<UnidadeMedidaDocument[] | []>
  show(query: FilterQuery<UnidadeMedidaDocument>): Promise<UnidadeMedidaDocument | null>
  save(data: UnidadeMedida): Promise<UnidadeMedidaDocument>
  update(data: UnidadeMedida, query: FilterQuery<UnidadeMedidaDocument>): Promise<void>
  delete(query: FilterQuery<UnidadeMedidaDocument>): Promise<void>
}

export class UnidadeMedidaRepository implements IUnidadeMedidaRepository {
  async save(data: UnidadeMedida) {
    const unidadeMedidaDTO = new UnidadeMedida(data)
    const unidadeMedida = await UnidadeMedidaModel.create(unidadeMedidaDTO)
    
    return unidadeMedida
  }

  async update(data: UnidadeMedida, query: FilterQuery<UnidadeMedidaDocument>){
    const unidadeMedidaDTO = new UnidadeMedida(data)
    await UnidadeMedidaModel.updateOne(query, unidadeMedidaDTO)
  }
  
  async index() {
    const unidadeMedidas = await UnidadeMedidaModel.find()
    if(!unidadeMedidas) return []
    return unidadeMedidas
  }

  async show(query: FilterQuery<UnidadeMedidaDocument>){
    const unidadeMedida = await UnidadeMedidaModel.findOne(query)
    return unidadeMedida
  }

  async delete(query: FilterQuery<UnidadeMedidaDocument>) {
    await UnidadeMedidaModel.deleteOne(query)
  }
}