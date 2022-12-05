import { Servico } from "./../entities/Servico";
import mongoose from '../config/mongodb'

export type ServicoDocument = Servico & mongoose.Document;

const ServicoSchema = new mongoose.Schema<ServicoDocument>(
  {
    codigoDespesa: {
      type: String,
      trim: true
    },
    codigoTabela: {
      type: String,
      trim: true
    },
    codigoProcedimento: {
      type: String,
      trim: true
    },
    descricaoProcedimento: {
      type: String
    }
  },
  {
    versionKey: false
  }
)

export default mongoose.model<ServicoDocument>('Servico', ServicoSchema)