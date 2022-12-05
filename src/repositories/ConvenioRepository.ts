import ConvenioModel, { ConvenioDocument } from "../schemas/ConvenioSchema";
import { Convenio } from "../entities/Convenio";
import { FilterQuery } from "mongoose";

export interface IConvenioRepository {
  index(): Promise<Convenio[] | []>
  show(query: FilterQuery<ConvenioDocument>): Promise<Convenio | null>
  save(data: Convenio): Promise<Convenio>
  update(data: Convenio, query: FilterQuery<ConvenioDocument>): Promise<void>
  delete(query: FilterQuery<ConvenioDocument>): Promise<void>
}

export class ConvenioRepository implements IConvenioRepository {
  async save(data: Convenio) {
    const convenioDTO = new Convenio(data)
    const convenio = await ConvenioModel.create(convenioDTO)
    
    return convenio.toObject()
  }

  async update(data: Convenio, query: FilterQuery<ConvenioDocument>){
    const convenioDTO = new Convenio(data)
    await ConvenioModel.updateOne(query, { $set: convenioDTO })
  }
  
  async index() {
    const convenios = await ConvenioModel.find()
    if(!convenios) return []
    return convenios.map(convenio => convenio.toObject())
  }

  async show(query: FilterQuery<ConvenioDocument>){
    const convenio = await ConvenioModel.findOne(query)
    if(!convenio) return null

    return convenio?.toObject()
  }

  async delete(query: FilterQuery<ConvenioDocument>) {
    await ConvenioModel.deleteOne(query)
  }
}