import ServicoModel, { ServicoDocument } from "../schemas/ServicoSchema";
import { Servico } from "../entities/Servico";
import { FilterQuery } from "mongoose";

export interface IServicoRepository {
  index(): Promise<ServicoDocument[] | []>
  show(query: FilterQuery<ServicoDocument>): Promise<ServicoDocument | null>
  save(data: Servico): Promise<ServicoDocument>
  update(data: Servico, query: FilterQuery<ServicoDocument>): Promise<void>
  delete(query: FilterQuery<ServicoDocument>): Promise<void>
}

export class ServicoRepository implements IServicoRepository {
  async save(data: Servico) {
    const servicoDTO = new Servico(data)
    const servico = await ServicoModel.create(servicoDTO)
    
    return servico
  }

  async update(data: Servico, query: FilterQuery<ServicoDocument>){
    const servicoDTO = new Servico(data)
    await ServicoModel.updateOne(query, servicoDTO)
  }
  
  async index() {
    const servicos = await ServicoModel.find()
    if(!servicos) return []
    return servicos
  }

  async show(query: FilterQuery<ServicoDocument>){
    const servico = await ServicoModel.findOne(query)
    return servico
  }

  async delete(query: FilterQuery<ServicoDocument>) {
    await ServicoModel.deleteOne(query)
  }
}