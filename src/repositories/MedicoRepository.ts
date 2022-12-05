import MedicoModel, { MedicoDocument } from "../schemas/MedicoSchema";
import { Medico } from "../entities/Medico";
import { FilterQuery } from "mongoose";

export interface IMedicoRepository {
  index(): Promise<MedicoDocument[] | []>
  show(query: FilterQuery<MedicoDocument>): Promise<Medico | null>
  save(data: Medico): Promise<MedicoDocument>
  update(data: Medico, query: FilterQuery<MedicoDocument>): Promise<void>
  delete(query: FilterQuery<MedicoDocument>): Promise<void>
}

export class MedicoRepository implements IMedicoRepository {
  async save(data: Medico) {
    const medicoDTO = new Medico(data)
    const medico = await MedicoModel.create(medicoDTO)
    
    return medico
  }

  async update(data: Medico, query: FilterQuery<MedicoDocument>){
    const MedicoDTO = new Medico(data)
    await MedicoModel.updateOne(query, MedicoDTO)
  }
  
  async index() {
    const medicos = await MedicoModel.find()
    if(!medicos) return []
    return medicos
  }

  async show(query: FilterQuery<MedicoDocument>){
    const response = await MedicoModel.findOne(query)
    const medico = response?.toObject()
    if(!medico) return null
    return medico
  }

  async delete(query: FilterQuery<MedicoDocument>) {
    await MedicoModel.deleteOne(query)
  }
}