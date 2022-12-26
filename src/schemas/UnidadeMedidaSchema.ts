import { UnidadeMedida } from "./../entities/UnidadeMedida";
import mongoose from '../config/mongodb'

export type UnidadeMedidaDocument = UnidadeMedida & mongoose.Document 

const UnidadeMedidaSchema = new mongoose.Schema<UnidadeMedidaDocument>(
  {
    codigo: {
      type: String,
      trim: true,
      required: true
    },
    descricao: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    versionKey: false
  }
)

export default mongoose.model<UnidadeMedidaDocument>('UnidadeMedida', UnidadeMedidaSchema)
