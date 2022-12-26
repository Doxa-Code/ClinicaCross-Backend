import { Medicamento } from "../entities/Medicamento";
import mongoose from "../config/mongodb";

export type MedicamentoDocument = Medicamento & mongoose.Document;

const MedicamentoSchema = new mongoose.Schema<MedicamentoDocument>(
  {
    codigo: {
      type: String,
      trim: true
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      trim: true,
    },
    descricao: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<MedicamentoDocument>(
  "Medicamento",
  MedicamentoSchema
);
