import { FormaDePagamento } from '../entities/FormaDePagamento'
import mongoose from '../config/mongodb'

export type FormaDePagamentoDocument = FormaDePagamento & mongoose.Document

const FormaDePagamentoSchema = new mongoose.Schema<FormaDePagamentoDocument>(
  {
    nome: {
      type: String,
      required: true
    },
    divide: {
      type: Boolean,
      default: false
    }
  },
  {
    versionKey: false
  }
)

export default mongoose.model<FormaDePagamentoDocument>('FormaDePagamento', FormaDePagamentoSchema)
