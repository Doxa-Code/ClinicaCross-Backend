import { Procedimento } from '../entities/Procedimento'
import mongoose from '../config/mongodb'

export type ProcedimentoDocument = Procedimento & mongoose.Document

const ProcedimentoSchema = new mongoose.Schema<ProcedimentoDocument>(
  {
    descricaoProcedimento: {
      type: String,
      trim: true,
      required: true
    },
    codigoDespesa: {
      type: String,
      trim: true,
    },
    codigoTabela: {
      type: String,
      trim: true,
    },
    codigoProcedimento: {
      type: String,
      trim: true,
    },
    unidadeMedida: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false
  }
)

export default mongoose.model<ProcedimentoDocument>('Procedimento', ProcedimentoSchema)
