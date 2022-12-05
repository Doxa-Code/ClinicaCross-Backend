import FaturamentoModel, { FaturamentoDocument } from "./../schemas/FaturamentoSchema";
import { Faturamento } from "../entities/Faturamento";
import { FilterQuery } from "mongoose";

export interface IFaturamentoRepository {
  index(): Promise<Faturamento[]>
  show(query: FilterQuery<FaturamentoDocument>): Promise<Faturamento | null>
  save(data: Faturamento): Promise<Faturamento>
  update(data: Faturamento, query: FilterQuery<FaturamentoDocument>): Promise<void>
  delete(query: FilterQuery<FaturamentoDocument>): Promise<void>
}

export class FaturamentoRepository implements IFaturamentoRepository {
  async save(data: Faturamento) {
    const countFaturamentos = await FaturamentoModel.countDocuments({});
    const faturamentoDTO = new Faturamento({
      ...data,
      cabecalho: {
        identificacaoTransacao: {
          sequencialTransacao: String(countFaturamentos) || '0'
        }
      },
      prestadorParaOperadora: {
        loteGuias: {
          ...(data?.prestadorParaOperadora?.loteGuias || {}),
          numeroLote: String(countFaturamentos) || '0',
        }
      }
    })
    const faturamento = await FaturamentoModel.create(faturamentoDTO)
    
    return faturamento
  }

  async update(data: Faturamento, query: FilterQuery<FaturamentoDocument>){
    const faturamentoDTO = new Faturamento(data)
    await FaturamentoModel.updateOne(query, { $set: faturamentoDTO })
  }
  
  async index() {
    const faturamentos = await FaturamentoModel.find()
    if(!faturamentos) return []
    return faturamentos.map(faturamento => faturamento.toObject())
  }

  async show(query: FilterQuery<FaturamentoDocument>){
    const faturamento = await FaturamentoModel.findOne(query)
    return faturamento?.toObject() || null
  }

  async delete(query: FilterQuery<FaturamentoDocument>) {
    await FaturamentoModel.deleteOne(query)
  }
}